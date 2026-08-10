import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { IBlogPostRepository, BlogPostFilterOptions } from '@domain/repositories/blog-post.repository.interface';
import { BlogPost } from '@domain/entities/blog-post.entity';
import { BlogPostOrmEntity } from '../database/entities/blog-post.orm-entity';
import { BlogPostMapper } from '../database/mappers/blog-post.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class BlogPostRepository implements IBlogPostRepository, OnModuleInit {
  private inMemoryBlogPosts: BlogPost[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(BlogPostOrmEntity)
    private readonly typeOrmRepo?: Repository<BlogPostOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryBlogPosts = [...seederService.getBlogPosts()];
    }
  }

  async onModuleInit() {
    this.inMemoryBlogPosts = [];
    if (this.typeOrmRepo) {
      try {
        const seedIds = ['blog_1', 'blog_2'];
        await this.typeOrmRepo.delete(seedIds);
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async findAll(filter?: BlogPostFilterOptions): Promise<{ items: BlogPost[]; total: number }> {
    if (this.typeOrmRepo) {
      try {
        const where: FindOptionsWhere<BlogPostOrmEntity> = {};

        if (filter?.categoryId) {
          where.categoryId = filter.categoryId;
        }

        if (filter?.isFeatured !== undefined) {
          where.isFeatured = filter.isFeatured;
        }

        const page = filter?.page || 1;
        const limit = filter?.limit || 20;
        const skip = (page - 1) * limit;

        const [list, total] = await this.typeOrmRepo.findAndCount({
          where,
          order: { publishedAt: 'DESC' },
          skip,
          take: limit,
        });

        return {
          items: list.map(BlogPostMapper.toDomain),
          total,
        };
      } catch {}
    }

    let result = [...this.inMemoryBlogPosts];

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
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { slug } });
        if (found) return BlogPostMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryBlogPosts.find((b) => b.slug === slug);
    return found || null;
  }

  async save(post: BlogPost): Promise<BlogPost> {
    if (this.typeOrmRepo) {
      try {
        const orm = BlogPostMapper.toOrm(post);
        const saved = await this.typeOrmRepo.save(orm);
        return BlogPostMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryBlogPosts.findIndex((b) => b.id === post.id);
    if (index >= 0) {
      this.inMemoryBlogPosts[index] = post;
    } else {
      this.inMemoryBlogPosts.push(post);
    }
    return post;
  }

  async delete(id: string): Promise<boolean> {
    if (this.typeOrmRepo) {
      try {
        const res = await this.typeOrmRepo.delete(id);
        return (res.affected || 0) > 0;
      } catch {}
    }

    const initialLen = this.inMemoryBlogPosts.length;
    this.inMemoryBlogPosts = this.inMemoryBlogPosts.filter((b) => b.id !== id);
    return this.inMemoryBlogPosts.length < initialLen;
  }
}
