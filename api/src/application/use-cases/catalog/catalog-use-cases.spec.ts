import { Product } from '@domain/entities/product.entity';
import { Category } from '@domain/entities/category.entity';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { GetProductsUseCase } from './get-products.use-case';
import { GetProductDetailUseCase } from './get-product-detail.use-case';
import { GetNewProductsUseCase } from './get-new-products.use-case';
import { GetCategoriesUseCase } from './get-categories.use-case';

describe('Catalog Domain Use Cases', () => {
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockCategoryRepo: jest.Mocked<ICategoryRepository>;

  const now = new Date();
  const twentyDaysAgo = new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000);
  const fortyDaysAgo = new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000);

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
      '100% gạo lứt đỏ nguyên cám',
      'Calo: 350kcal, Chất xơ: 4g',
      'Gạo lứt đỏ tự nhiên',
      false,
      twentyDaysAgo,
      new Date(),
      ['/img/gao.jpg'],
    ),
    new Product(
      'prod_2',
      'cat_1',
      'Trà Gạo Lứt Đậu Đen',
      'tra-gao-lut-dau-den',
      85000,
      100000,
      30,
      '500g',
      'Hà Nội',
      'Gạo lứt hầm, đậu đen xanh lòng',
      'Calo: 120kcal',
      'Trà thảo mộc thanh nhiệt',
      true, // isFeaturedNew = true (even if 40 days old)
      fortyDaysAgo,
      new Date(),
      ['/img/tra.jpg'],
    ),
    new Product(
      'prod_3',
      'cat_2',
      'Bột Sắn Dây Ta 500g',
      'bot-san-day-ta',
      150000,
      null,
      20,
      '500g',
      'Hải Dương',
      '100% bột sắn dây ta',
      'Calo: 340kcal',
      'Bột sắn dây nguyên chất',
      false,
      fortyDaysAgo,
      new Date(),
      ['/img/san-day.jpg'],
    ),
  ];

  const sampleCategories: Category[] = [
    new Category('cat_1', 'Gạo & Ngũ Cốc', 'gao-ngu-coc', 'Các loại gạo lứt nguyên cám'),
    new Category('cat_2', 'Đậu & Bột', 'dau-bot', 'Bột dinh dưỡng thiên nhiên'),
  ];

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn().mockImplementation(async (id: string) => sampleProducts.find((p) => p.id === id) || null),
      findBySlug: jest.fn().mockImplementation(async (slug: string) => sampleProducts.find((p) => p.slug === slug) || null),
      findAll: jest.fn().mockResolvedValue({ items: sampleProducts, total: sampleProducts.length }),
      findNewArrivals: jest.fn().mockImplementation(async (refDate?: Date) => {
        const d = refDate || new Date();
        return sampleProducts.filter((p) => p.isNewArrival(d));
      }),
      findByIds: jest.fn().mockImplementation(async (ids: string[]) => sampleProducts.filter((p) => ids.includes(p.id))),
      save: jest.fn(),
    };

    mockCategoryRepo = {
      findAll: jest.fn().mockResolvedValue(sampleCategories),
      findBySlug: jest.fn().mockImplementation(async (slug: string) => sampleCategories.find((c) => c.slug === slug) || null),
      findById: jest.fn().mockImplementation(async (id: string) => sampleCategories.find((c) => c.id === id) || null),
    };
  });

  it('GetProductsUseCase should return all products', async () => {
    const useCase = new GetProductsUseCase(mockProductRepo);
    const result = await useCase.execute();
    expect(result.items).toHaveLength(3);
    expect(result.total).toBe(3);
    expect(mockProductRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('GetProductDetailUseCase should return product by slug or id', async () => {
    const useCase = new GetProductDetailUseCase(mockProductRepo);
    
    const productBySlug = await useCase.execute('gao-lut-do-st25');
    expect(productBySlug).toBeDefined();
    expect(productBySlug?.id).toBe('prod_1');

    const productById = await useCase.execute('prod_2');
    expect(productById).toBeDefined();
    expect(productById?.name).toBe('Trà Gạo Lứt Đậu Đen');

    const notFound = await useCase.execute('non-existent');
    expect(notFound).toBeNull();
  });

  it('GetNewProductsUseCase should apply Hybrid Domain Rule (released <= 30 days OR isFeaturedNew = true)', async () => {
    const useCase = new GetNewProductsUseCase(mockProductRepo);
    const newProducts = await useCase.execute(now);

    // prod_1: released 20 days ago -> IS new arrival
    // prod_2: isFeaturedNew = true -> IS new arrival
    // prod_3: released 40 days ago and isFeaturedNew = false -> NOT new arrival
    expect(newProducts).toHaveLength(2);
    expect(newProducts.map((p) => p.id)).toEqual(['prod_1', 'prod_2']);
  });

  it('GetCategoriesUseCase should return all active categories', async () => {
    const useCase = new GetCategoriesUseCase(mockCategoryRepo);
    const categories = await useCase.execute();
    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe('Gạo & Ngũ Cốc');
  });
});
