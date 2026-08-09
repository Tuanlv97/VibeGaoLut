import { BlogPost } from '@domain/entities/blog-post.entity';
import { Product } from '@domain/entities/product.entity';
import { IBlogPostRepository } from '@domain/repositories/blog-post.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { GetBlogPostsUseCase } from './get-blog-posts.use-case';
import { GetBlogPostDetailUseCase } from './get-blog-post-detail.use-case';

describe('Content Domain Use Cases', () => {
  let mockBlogRepo: jest.Mocked<IBlogPostRepository>;
  let mockProductRepo: jest.Mocked<IProductRepository>;

  const sampleProducts: Product[] = [
    new Product(
      'prod_1',
      'cat_1',
      'Gạo Lứt Đỏ ST25 1kg',
      'gao-lut-do-st25',
      120000,
      150000,
      50,
      '1kg',
      'Sóc Trăng',
      'gạo lứt',
      'calo',
      'mô tả',
      false,
      new Date(),
    ),
  ];

  const samplePosts: BlogPost[] = [
    new BlogPost(
      'post_1',
      'cat_blog_1',
      '5 Lợi ích của gạo lứt đỏ nguyên cám',
      '5-loi-ich-cua-gao-lut-do',
      'Gạo lứt đỏ chứa nhiều chất xơ...',
      '<p>Nội dung chi tiết...</p>',
      '/img/blog1.jpg',
      'Dược sĩ Minh Anh',
      5,
      true,
      new Date(),
      new Date(),
      ['prod_1'], // Attached related product
    ),
  ];

  beforeEach(() => {
    mockBlogRepo = {
      findAll: jest.fn().mockResolvedValue({ items: samplePosts, total: samplePosts.length }),
      findBySlug: jest.fn().mockImplementation(async (slug: string) => samplePosts.find((p) => p.slug === slug) || null),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockProductRepo = {
      findById: jest.fn(),
      findBySlug: jest.fn(),
      findAll: jest.fn(),
      findNewArrivals: jest.fn(),
      findByIds: jest.fn().mockImplementation(async (ids: string[]) => sampleProducts.filter((p) => ids.includes(p.id))),
      save: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('GetBlogPostsUseCase should return blog posts list', async () => {
    const useCase = new GetBlogPostsUseCase(mockBlogRepo);
    const result = await useCase.execute();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].title).toContain('5 Lợi ích');
  });

  it('GetBlogPostDetailUseCase should return post with related products attached', async () => {
    const useCase = new GetBlogPostDetailUseCase(mockBlogRepo, mockProductRepo);
    const result = await useCase.execute('5-loi-ich-cua-gao-lut-do');

    expect(result).toBeDefined();
    expect(result?.post.id).toBe('post_1');
    expect(result?.relatedProducts).toHaveLength(1);
    expect(result?.relatedProducts[0].name).toBe('Gạo Lứt Đỏ ST25 1kg');
  });
});
