import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';

export class GetNewProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(referenceDate: Date = new Date()): Promise<Product[]> {
    const products = await this.productRepository.findNewArrivals(referenceDate);
    // Double check with domain entity rule to guarantee compliance
    return products.filter((product) => product.isNewArrival(referenceDate));
  }
}
