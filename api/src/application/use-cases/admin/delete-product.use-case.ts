import { IProductRepository } from '@domain/repositories/product.repository.interface';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return await this.productRepository.delete(id);
  }
}
