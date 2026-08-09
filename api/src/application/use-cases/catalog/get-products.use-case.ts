import { IProductRepository, ProductFilterOptions } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(options?: ProductFilterOptions): Promise<{ items: Product[]; total: number }> {
    return this.productRepository.findAll(options);
  }
}
