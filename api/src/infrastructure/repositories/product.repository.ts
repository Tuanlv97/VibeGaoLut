import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, ILike, In } from 'typeorm';
import { IProductRepository, ProductFilterOptions } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { ProductMapper } from '../database/mappers/product.mapper';
import { SeederService } from '../database/seeds/seeder.service';

import { CategoryOrmEntity } from '../database/entities/category.orm-entity';

@Injectable()
export class ProductRepository implements IProductRepository, OnModuleInit {
  private inMemoryProducts: Product[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(ProductOrmEntity)
    private readonly typeOrmRepo?: Repository<ProductOrmEntity>,
    @Optional()
    @InjectRepository(CategoryOrmEntity)
    private readonly categoryTypeOrmRepo?: Repository<CategoryOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryProducts = [...seederService.getProducts()];
    }
  }

  async onModuleInit() {
    this.inMemoryProducts = this.seederService ? [...this.seederService.getProducts()] : [];
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const products = this.seederService.getProducts();
          for (const prod of products) {
            await this.typeOrmRepo.save(ProductMapper.toOrm(prod));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  private async enrichProduct(p: Product): Promise<Product> {
    p.rating = p.rating || 5;
    p.reviewCount = p.reviewCount || 18;
    const categories = this.seederService ? this.seederService.getCategories() : [];
    if (this.categoryTypeOrmRepo) {
      try {
        const cat = await this.categoryTypeOrmRepo.findOne({ where: { id: p.categoryId } });
        if (cat) {
          p.categorySlug = cat.slug;
          p.categoryName = cat.name;
          return p;
        }
      } catch {}
    }
    const cat = categories.find((c) => c.id === p.categoryId || c.slug === p.categoryId);
    if (cat) {
      p.categorySlug = cat.slug;
      p.categoryName = cat.name;
    }
    return p;
  }

  async findById(id: string): Promise<Product | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return this.enrichProduct(ProductMapper.toDomain(found));
      } catch {}
    }
    const found = this.inMemoryProducts.find((p) => p.id === id);
    return found ? this.enrichProduct(found) : null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { slug } });
        if (found) return this.enrichProduct(ProductMapper.toDomain(found));
      } catch {}
    }
    const found = this.inMemoryProducts.find((p) => p.slug === slug);
    return found ? this.enrichProduct(found) : null;
  }

  async findAll(filter?: ProductFilterOptions): Promise<{ items: Product[]; total: number }> {
    if (this.typeOrmRepo) {
      try {
        const where: FindOptionsWhere<ProductOrmEntity> = {};

        if (filter?.categoryId) {
          let targetCatId = filter.categoryId;
          if (this.categoryTypeOrmRepo) {
            const cat = await this.categoryTypeOrmRepo.findOne({
              where: [{ id: filter.categoryId }, { slug: filter.categoryId }],
            });
            if (cat) targetCatId = cat.id;
          }
          where.categoryId = targetCatId;
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

        const items = await Promise.all(list.map((item) => this.enrichProduct(ProductMapper.toDomain(item))));

        return {
          items,
          total,
        };
      } catch {}
    }

    let result = [...this.inMemoryProducts];

    if (filter?.categoryId) {
      let targetCatId = filter.categoryId;
      const categories = this.seederService ? this.seederService.getCategories() : [];
      const cat = categories.find((c) => c.id === filter.categoryId || c.slug === filter.categoryId);
      if (cat) targetCatId = cat.id;
      result = result.filter((p) => p.categoryId === targetCatId);
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
    const paginatedItems = await Promise.all(
      result.slice(startIndex, startIndex + limit).map((p) => this.enrichProduct(p)),
    );

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
