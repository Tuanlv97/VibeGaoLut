import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';

export interface UpdateProductInput {
  id: string;
  categoryId?: string;
  name?: string;
  slug?: string;
  price?: number;
  compareAtPrice?: number | null;
  stockQuantity?: number;
  weightUnit?: string;
  origin?: string;
  ingredients?: string;
  nutritionInfo?: string;
  description?: string;
  isFeaturedNew?: boolean;
  images?: string[];
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findById(input.id);
    if (!product) {
      throw new Error(`Product with ID ${input.id} not found.`);
    }

    if (input.categoryId !== undefined) product.categoryId = input.categoryId;
    if (input.name !== undefined) product.name = input.name;
    if (input.slug !== undefined) product.slug = input.slug;
    if (input.price !== undefined) product.price = input.price;
    if (input.compareAtPrice !== undefined) product.compareAtPrice = input.compareAtPrice;
    if (input.stockQuantity !== undefined) product.stockQuantity = input.stockQuantity;
    if (input.weightUnit !== undefined) product.weightUnit = input.weightUnit;
    if (input.origin !== undefined) product.origin = input.origin;
    if (input.ingredients !== undefined) product.ingredients = input.ingredients;
    if (input.nutritionInfo !== undefined) product.nutritionInfo = input.nutritionInfo;
    if (input.description !== undefined) product.description = input.description;
    if (input.isFeaturedNew !== undefined) product.isFeaturedNew = input.isFeaturedNew;
    if (input.images !== undefined) product.images = input.images;

    return await this.productRepository.save(product);
  }
}
