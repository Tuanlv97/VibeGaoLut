import { Injectable } from '@nestjs/common';
import { IProductRepository, ProductFilterOptions } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class ProductRepository implements IProductRepository {
  private products: Product[] = [];

  constructor(private readonly seederService: SeederService) {
    this.products = [...seederService.getProducts()];
  }

  async findById(id: string): Promise<Product | null> {
    const found = this.products.find((p) => p.id === id);
    return found || null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const found = this.products.find((p) => p.slug === slug);
    return found || null;
  }

  async findAll(filter?: ProductFilterOptions): Promise<{ items: Product[]; total: number }> {
    let result = [...this.products];

    if (filter?.categoryId) {
      result = result.filter((p) => p.categoryId === filter.categoryId);
    }

    if (filter?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filter.minPrice!);
    }

    if (filter?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filter.maxPrice!);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q),
      );
    }

    if (filter?.sort) {
      if (filter.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (filter.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (filter.sort === 'newest') {
        result.sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime());
      }
    }

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedItems = result.slice(startIndex, startIndex + limit);

    return { items: paginatedItems, total };
  }

  async findNewArrivals(referenceDate: Date = new Date()): Promise<Product[]> {
    return this.products.filter((p) => p.isNewArrival(referenceDate));
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.products.filter((p) => ids.includes(p.id));
  }

  async save(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
    return product;
  }
}
