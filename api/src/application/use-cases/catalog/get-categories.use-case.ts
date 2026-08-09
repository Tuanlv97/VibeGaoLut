import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { Category } from '@domain/entities/category.entity';

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
