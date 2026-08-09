import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { Category } from '@domain/entities/category.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  constructor(private readonly seederService: SeederService) {
    this.categories = [...seederService.getCategories()];
  }

  async findAll(): Promise<Category[]> {
    return this.categories.filter((c) => c.isActive);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.slug === slug);
    return found || null;
  }

  async findById(id: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.id === id);
    return found || null;
  }
}
