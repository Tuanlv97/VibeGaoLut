import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { Category } from '@domain/entities/category.entity';
import { CategoryOrmEntity } from '../database/entities/category.orm-entity';
import { CategoryMapper } from '../database/mappers/category.mapper';
import { SeederService } from '../database/seeds/seeder.service';

import { ProductOrmEntity } from '../database/entities/product.orm-entity';

@Injectable()
export class CategoryRepository implements ICategoryRepository, OnModuleInit {
  private inMemoryCategories: Category[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(CategoryOrmEntity)
    private readonly typeOrmRepo?: Repository<CategoryOrmEntity>,
    @Optional()
    @InjectRepository(ProductOrmEntity)
    private readonly productTypeOrmRepo?: Repository<ProductOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryCategories = [...seederService.getCategories()];
    }
  }

  async onModuleInit() {
    this.inMemoryCategories = this.seederService ? [...this.seederService.getCategories()] : [];
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const categories = this.seederService.getCategories();
          for (const cat of categories) {
            await this.typeOrmRepo.save(CategoryMapper.toOrm(cat));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async findAll(): Promise<Category[]> {
    let categories: Category[] = [];
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({ where: { isActive: true } });
        if (list.length > 0) {
          categories = list.map(CategoryMapper.toDomain);
        }
      } catch {}
    }
    if (categories.length === 0) {
      categories = this.inMemoryCategories.filter((c) => c.isActive);
    }

    const allProducts = this.seederService ? this.seederService.getProducts() : [];
    for (const cat of categories) {
      if (this.productTypeOrmRepo) {
        try {
          cat.productCount = await this.productTypeOrmRepo.count({ where: { categoryId: cat.id } });
        } catch {
          cat.productCount = allProducts.filter((p) => p.categoryId === cat.id).length;
        }
      } else {
        cat.productCount = allProducts.filter((p) => p.categoryId === cat.id).length;
      }
    }

    return categories;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { slug } });
        if (found) return CategoryMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryCategories.find((c) => c.slug === slug);
    return found || null;
  }

  async findById(id: string): Promise<Category | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return CategoryMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryCategories.find((c) => c.id === id);
    return found || null;
  }
}
