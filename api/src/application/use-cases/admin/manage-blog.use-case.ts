import { IBlogPostRepository } from '@domain/repositories/blog-post.repository.interface';
import { BlogPost } from '@domain/entities/blog-post.entity';
import { randomUUID } from 'crypto';

export interface CreateBlogPostInput {
  categoryId: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  readingTimeMinutes?: number;
  isFeatured?: boolean;
  relatedProductIds?: string[];
}

export interface UpdateBlogPostInput {
  id: string;
  categoryId?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  authorName?: string;
  readingTimeMinutes?: number;
  isFeatured?: boolean;
  relatedProductIds?: string[];
}

export class ManageBlogUseCase {
  constructor(private readonly blogRepository: IBlogPostRepository) {}

  async create(input: CreateBlogPostInput): Promise<BlogPost> {
    const slug = input.slug || input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const post = new BlogPost(
      randomUUID(),
      input.categoryId,
      input.title,
      slug,
      input.excerpt,
      input.content,
      input.coverImage,
      input.authorName,
      input.readingTimeMinutes || 5,
      input.isFeatured ?? false,
      new Date(),
      new Date(),
      input.relatedProductIds || [],
    );

    return await this.blogRepository.save(post);
  }

  async update(input: UpdateBlogPostInput): Promise<BlogPost> {
    const posts = await this.blogRepository.findAll({ limit: 1000 });
    const post = posts.items.find((p) => p.id === input.id);
    if (!post) {
      throw new Error(`Blog post with ID ${input.id} not found.`);
    }

    if (input.categoryId !== undefined) post.categoryId = input.categoryId;
    if (input.title !== undefined) post.title = input.title;
    if (input.slug !== undefined) post.slug = input.slug;
    if (input.excerpt !== undefined) post.excerpt = input.excerpt;
    if (input.content !== undefined) post.content = input.content;
    if (input.coverImage !== undefined) post.coverImage = input.coverImage;
    if (input.authorName !== undefined) post.authorName = input.authorName;
    if (input.readingTimeMinutes !== undefined) post.readingTimeMinutes = input.readingTimeMinutes;
    if (input.isFeatured !== undefined) post.isFeatured = input.isFeatured;
    if (input.relatedProductIds !== undefined) post.relatedProductIds = input.relatedProductIds;

    return await this.blogRepository.save(post);
  }

  async delete(id: string): Promise<boolean> {
    return await this.blogRepository.delete(id);
  }
}
