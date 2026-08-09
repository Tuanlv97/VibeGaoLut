import { IBlogPostRepository } from '@domain/repositories/blog-post.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { BlogPost } from '@domain/entities/blog-post.entity';
import { Product } from '@domain/entities/product.entity';

export interface BlogPostDetailResult {
  post: BlogPost;
  relatedProducts: Product[];
}

export class GetBlogPostDetailUseCase {
  constructor(
    private readonly blogPostRepository: IBlogPostRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(slug: string): Promise<BlogPostDetailResult | null> {
    const post = await this.blogPostRepository.findBySlug(slug);
    if (!post) {
      return null;
    }

    let relatedProducts: Product[] = [];
    if (post.relatedProductIds && post.relatedProductIds.length > 0) {
      relatedProducts = await this.productRepository.findByIds(post.relatedProductIds);
    }

    return {
      post,
      relatedProducts,
    };
  }
}
