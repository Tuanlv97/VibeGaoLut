import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { randomUUID } from 'crypto';

export interface CreateProductInput {
  categoryId: string;
  name: string;
  slug?: string;
  price: number;
  compareAtPrice?: number | null;
  stockQuantity: number;
  weightUnit: string;
  origin: string;
  ingredients: string;
  nutritionInfo: string;
  description: string;
  isFeaturedNew?: boolean;
  images?: string[];
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const slug = input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const product = new Product(
      randomUUID(),
      input.categoryId,
      input.name,
      slug,
      input.price,
      input.compareAtPrice ?? null,
      input.stockQuantity,
      input.weightUnit,
      input.origin,
      input.ingredients,
      input.nutritionInfo,
      input.description,
      input.isFeaturedNew ?? false,
      new Date(),
      new Date(),
      input.images || ['https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop'],
    );

    return await this.productRepository.save(product);
  }
}
