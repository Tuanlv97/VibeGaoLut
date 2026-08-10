import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { Category } from '@domain/entities/category.entity';
import { CategoryOrmEntity } from '../database/entities/category.orm-entity';
import { CategoryMapper } from '../database/mappers/category.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class CategoryRepository implements ICategoryRepository, OnModuleInit {
  private inMemoryCategories: Category[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(CategoryOrmEntity)
    private readonly typeOrmRepo?: Repository<CategoryOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryCategories = [...seederService.getCategories()];
    }
  }

  async onModuleInit() {
    this.inMemoryCategories = [];
    if (this.typeOrmRepo) {
      try {
        const seedIds = ['cat_gao_ngu_coc', 'cat_tra_herbal', 'cat_dau_bot', 'cat_healthy_snacks'];
        await this.typeOrmRepo.delete(seedIds);
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async findAll(): Promise<Category[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({ where: { isActive: true } });
        if (list.length > 0) return list.map(CategoryMapper.toDomain);
      } catch {}
    }
    return this.inMemoryCategories.filter((c) => c.isActive);
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
