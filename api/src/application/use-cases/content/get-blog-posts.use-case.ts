import { IBlogPostRepository, BlogPostFilterOptions } from '@domain/repositories/blog-post.repository.interface';
import { BlogPost } from '@domain/entities/blog-post.entity';

export class GetBlogPostsUseCase {
  constructor(private readonly blogPostRepository: IBlogPostRepository) {}

  async execute(options?: BlogPostFilterOptions): Promise<{ items: BlogPost[]; total: number }> {
    return this.blogPostRepository.findAll(options);
  }
}
