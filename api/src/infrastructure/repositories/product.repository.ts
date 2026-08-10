import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, ILike, In } from 'typeorm';
import { IProductRepository, ProductFilterOptions } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { ProductMapper } from '../database/mappers/product.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class ProductRepository implements IProductRepository, OnModuleInit {
  private inMemoryProducts: Product[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(ProductOrmEntity)
    private readonly typeOrmRepo?: Repository<ProductOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryProducts = [...seederService.getProducts()];
    }
  }

  async onModuleInit() {
    this.inMemoryProducts = [];
    if (this.typeOrmRepo) {
      try {
        const seedIds = ['prod_gao_lut_st25', 'prod_tra_gao_lut', 'prod_bot_san_day', 'prod_yen_mach'];
        await this.typeOrmRepo.delete(seedIds);
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async findById(id: string): Promise<Product | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return ProductMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryProducts.find((p) => p.id === id);
    return found || null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { slug } });
        if (found) return ProductMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryProducts.find((p) => p.slug === slug);
    return found || null;
  }

  async findAll(filter?: ProductFilterOptions): Promise<{ items: Product[]; total: number }> {
    if (this.typeOrmRepo) {
      try {
        const where: FindOptionsWhere<ProductOrmEntity> = {};

        if (filter?.categoryId) {
          where.categoryId = filter.categoryId;
        }

        if (filter?.minPrice !== undefined && filter?.maxPrice !== undefined) {
          where.price = MoreThanOrEqual(filter.minPrice) && LessThanOrEqual(filter.maxPrice);
        } else if (filter?.minPrice !== undefined) {
          where.price = MoreThanOrEqual(filter.minPrice);
        } else if (filter?.maxPrice !== undefined) {
          where.price = LessThanOrEqual(filter.maxPrice);
        }

        if (filter?.search) {
          where.name = ILike(`%${filter.search}%`);
        }

        let order: Record<string, 'ASC' | 'DESC'> = { createdAt: 'DESC' };
        if (filter?.sort === 'price_asc') {
          order = { price: 'ASC' };
        } else if (filter?.sort === 'price_desc') {
          order = { price: 'DESC' };
        } else if (filter?.sort === 'newest') {
          order = { releasedAt: 'DESC' };
        }

        const page = filter?.page || 1;
        const limit = filter?.limit || 20;
        const skip = (page - 1) * limit;

        const [list, total] = await this.typeOrmRepo.findAndCount({
          where,
          order,
          skip,
          take: limit,
        });

        return {
          items: list.map(ProductMapper.toDomain),
          total,
        };
      } catch {}
    }

    let result = [...this.inMemoryProducts];

    if (filter?.categoryId) {
      result = result.filter((p) => p.categoryId === filter.categoryId);
    }

    if (filter?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filter.minPrice!);
    }

    if (filter?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filter.maxPrice!);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q),
      );
    }

    if (filter?.sort) {
      if (filter.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (filter.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (filter.sort === 'newest') {
        result.sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime());
      }
    }

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedItems = result.slice(startIndex, startIndex + limit);

    return { items: paginatedItems, total };
  }

  async findNewArrivals(referenceDate: Date = new Date()): Promise<Product[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find();
        if (list.length > 0) {
          const domainList = list.map(ProductMapper.toDomain);
          return domainList.filter((p) => p.isNewArrival(referenceDate));
        }
      } catch {}
    }
    return this.inMemoryProducts.filter((p) => p.isNewArrival(referenceDate));
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    if (this.typeOrmRepo && ids.length > 0) {
      try {
        const list = await this.typeOrmRepo.find({ where: { id: In(ids) } });
        if (list.length > 0) return list.map(ProductMapper.toDomain);
      } catch {}
    }
    return this.inMemoryProducts.filter((p) => ids.includes(p.id));
  }

  async save(product: Product): Promise<Product> {
    if (this.typeOrmRepo) {
      try {
        const orm = ProductMapper.toOrm(product);
        const saved = await this.typeOrmRepo.save(orm);
        return ProductMapper.toDomain(saved);
      } catch {}
    }
    const index = this.inMemoryProducts.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.inMemoryProducts[index] = product;
    } else {
      this.inMemoryProducts.push(product);
    }
    return product;
  }

  async delete(id: string): Promise<boolean> {
    if (this.typeOrmRepo) {
      try {
        const res = await this.typeOrmRepo.delete(id);
        return (res.affected || 0) > 0;
      } catch {}
    }
    const initialLen = this.inMemoryProducts.length;
    this.inMemoryProducts = this.inMemoryProducts.filter((p) => p.id !== id);
    return this.inMemoryProducts.length < initialLen;
  }
}
