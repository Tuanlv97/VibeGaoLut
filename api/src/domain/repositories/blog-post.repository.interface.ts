import { BlogPost } from '../entities/blog-post.entity';

export interface BlogPostFilterOptions {
  categoryId?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface IBlogPostRepository {
  findAll(filter?: BlogPostFilterOptions): Promise<{ items: BlogPost[]; total: number }>;
  findBySlug(slug: string): Promise<BlogPost | null>;
}
