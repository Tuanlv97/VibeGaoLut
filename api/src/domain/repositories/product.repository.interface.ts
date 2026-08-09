import { Product } from '../entities/product.entity';

export interface ProductFilterOptions {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  findAll(filter?: ProductFilterOptions): Promise<{ items: Product[]; total: number }>;
  findNewArrivals(referenceDate?: Date): Promise<Product[]>;
  findByIds(ids: string[]): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
