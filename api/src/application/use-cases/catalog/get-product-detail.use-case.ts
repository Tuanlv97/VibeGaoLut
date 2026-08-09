import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';

export class GetProductDetailUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(identifier: string): Promise<Product | null> {
    // Try finding by slug first, if not found try finding by ID
    const productBySlug = await this.productRepository.findBySlug(identifier);
    if (productBySlug) {
      return productBySlug;
    }
    return this.productRepository.findById(identifier);
  }
}
