import { Injectable } from '@nestjs/common';
import { IBlogPostRepository, BlogPostFilterOptions } from '@domain/repositories/blog-post.repository.interface';
import { BlogPost } from '@domain/entities/blog-post.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class BlogPostRepository implements IBlogPostRepository {
  private blogPosts: BlogPost[] = [];

  constructor(private readonly seederService: SeederService) {
    this.blogPosts = [...seederService.getBlogPosts()];
  }

  async findAll(filter?: BlogPostFilterOptions): Promise<{ items: BlogPost[]; total: number }> {
    let result = [...this.blogPosts];

    if (filter?.categoryId) {
      result = result.filter((b) => b.categoryId === filter.categoryId);
    }

    if (filter?.isFeatured !== undefined) {
      result = result.filter((b) => b.isFeatured === filter.isFeatured);
    }

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedItems = result.slice(startIndex, startIndex + limit);

    return { items: paginatedItems, total };
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const found = this.blogPosts.find((b) => b.slug === slug);
    return found || null;
  }

  async save(post: BlogPost): Promise<BlogPost> {
    const index = this.blogPosts.findIndex((b) => b.id === post.id);
    if (index >= 0) {
      this.blogPosts[index] = post;
    } else {
      this.blogPosts.push(post);
    }
    return post;
  }

  async delete(id: string): Promise<boolean> {
    const initialLen = this.blogPosts.length;
    this.blogPosts = this.blogPosts.filter((b) => b.id !== id);
    return this.blogPosts.length < initialLen;
  }
}
