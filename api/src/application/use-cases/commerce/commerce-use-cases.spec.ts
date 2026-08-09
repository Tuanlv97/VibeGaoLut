import { Product } from '@domain/entities/product.entity';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { Review } from '@domain/entities/review.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { ReviewStatus } from '@domain/enums/review-status.enum';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IReviewRepository } from '@domain/repositories/review.repository.interface';
import { CreateOrderUseCase } from './create-order.use-case';
import { TrackOrderUseCase } from './track-order.use-case';
import { CreateReviewUseCase } from './create-review.use-case';

describe('Commerce Domain Use Cases', () => {
  let mockOrderRepo: jest.Mocked<IOrderRepository>;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockReviewRepo: jest.Mocked<IReviewRepository>;

  const sampleProducts: Product[] = [
    new Product(
      'prod_1',
      'cat_1',
      'Gạo Lứt Đỏ ST25 1kg',
      'gao-lut-do-st25',
      120000,
      150000,
      10,
      '1kg',
      'Sóc Trăng',
      'gạo lứt',
      'calo',
      'mô tả',
      false,
      new Date(),
    ),
    new Product(
      'prod_2',
      'cat_1',
      'Trà Gạo Lứt',
      'tra-gao-lut',
      80000,
      null,
      2,
      '500g',
      'Hà Nội',
      'trà',
      'calo',
      'mô tả',
      false,
      new Date(),
    ),
  ];

  const deliveredOrder = new Order(
    'ord_delivered',
    'GP-883920',
    'Nguyen Van A',
    '0912345678',
    'ana@example.com',
    'Hà Nội',
    'Cầu Giấy',
    'Dịch Vọng',
    '10 Phạm Hùng',
    200000,
    30000,
    230000,
    'COD',
    OrderStatus.DELIVERED,
    new Date(),
    [
      new OrderItem('item_1', 'ord_delivered', 'prod_1', 'Gạo Lứt Đỏ ST25 1kg', 120000, 1, 120000),
    ],
  );

  const pendingOrder = new Order(
    'ord_pending',
    'GP-111222',
    'Tran Thi B',
    '0987654321',
    'b@example.com',
    'TP HCM',
    'Quận 1',
    'Bến Nghé',
    '1 Nguyễn Huệ',
    120000,
    30000,
    150000,
    'COD',
    OrderStatus.PENDING,
    new Date(),
    [
      new OrderItem('item_2', 'ord_pending', 'prod_1', 'Gạo Lứt Đỏ ST25 1kg', 120000, 1, 120000),
    ],
  );

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn(),
      findBySlug: jest.fn(),
      findAll: jest.fn(),
      findNewArrivals: jest.fn(),
      findByIds: jest.fn().mockImplementation(async (ids: string[]) => sampleProducts.filter((p) => ids.includes(p.id))),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockOrderRepo = {
      save: jest.fn().mockImplementation(async (order: Order) => order),
      findByOrderNumberAndPhone: jest.fn().mockImplementation(async (orderNum: string, phone: string) => {
        if (orderNum === 'GP-883920' && phone === '0912345678') return deliveredOrder;
        if (orderNum === 'GP-111222' && phone === '0987654321') return pendingOrder;
        return null;
      }),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    mockReviewRepo = {
      save: jest.fn().mockImplementation(async (rev: Review) => rev),
      findByProductId: jest.fn().mockResolvedValue([]),
    };
  });

  describe('CreateOrderUseCase', () => {
    it('should calculate order subtotal 100% from backend DB prices and generate GP-XXXXXX order number', async () => {
      const useCase = new CreateOrderUseCase(mockOrderRepo, mockProductRepo);
      const order = await useCase.execute({
        customerName: 'Le Van C',
        customerPhone: '0933333333',
        customerEmail: 'c@example.com',
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        ward: 'Hòa Cường Bắc',
        addressDetail: '100 đường 2/9',
        items: [
          { productId: 'prod_1', quantity: 2 }, // 2 * 120,000 = 240,000
          { productId: 'prod_2', quantity: 1 }, // 1 * 80,000 = 80,000 -> Total Subtotal = 320,000
        ],
      });

      expect(order.subtotal).toBe(320000);
      expect(order.shippingFee).toBe(0); // Free shipping because subtotal >= 300k
      expect(order.totalAmount).toBe(320000);
      expect(order.orderNumber).toMatch(/^GP-\d{6}$/);
      expect(order.status).toBe(OrderStatus.PENDING);
      expect(mockOrderRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should throw error if product stock is insufficient', async () => {
      const useCase = new CreateOrderUseCase(mockOrderRepo, mockProductRepo);
      await expect(
        useCase.execute({
          customerName: 'Le Van C',
          customerPhone: '0933333333',
          customerEmail: 'c@example.com',
          province: 'Đà Nẵng',
          district: 'Hải Châu',
          ward: 'Hòa Cường Bắc',
          addressDetail: '100 đường 2/9',
          items: [{ productId: 'prod_2', quantity: 10 }], // prod_2 stock is 2
        }),
      ).rejects.toThrow('không đủ số lượng trong kho');
    });
  });

  describe('TrackOrderUseCase', () => {
    it('should return matching order by orderNumber and phone', async () => {
      const useCase = new TrackOrderUseCase(mockOrderRepo);
      const order = await useCase.execute({
        orderNumber: 'GP-883920',
        customerPhone: '0912345678',
      });
      expect(order).toBeDefined();
      expect(order?.id).toBe('ord_delivered');
      expect(order?.status).toBe(OrderStatus.DELIVERED);
    });

    it('should return null if order number or phone does not match', async () => {
      const useCase = new TrackOrderUseCase(mockOrderRepo);
      const order = await useCase.execute({
        orderNumber: 'GP-000000',
        customerPhone: '0912345678',
      });
      expect(order).toBeNull();
    });
  });

  describe('CreateReviewUseCase (Guest Verified Review)', () => {
    it('should create review with PENDING status when order is DELIVERED and contains product', async () => {
      const useCase = new CreateReviewUseCase(mockReviewRepo, mockOrderRepo);
      const review = await useCase.execute({
        orderNumber: 'GP-883920',
        customerPhone: '0912345678',
        productId: 'prod_1',
        rating: 5,
        comment: 'Gạo rất dẻo và thơm!',
      });

      expect(review.status).toBe(ReviewStatus.PENDING);
      expect(review.rating).toBe(5);
      expect(review.productId).toBe('prod_1');
      expect(mockReviewRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should throw error if order status is NOT DELIVERED', async () => {
      const useCase = new CreateReviewUseCase(mockReviewRepo, mockOrderRepo);
      await expect(
        useCase.execute({
          orderNumber: 'GP-111222', // Status is PENDING
          customerPhone: '0987654321',
          productId: 'prod_1',
          rating: 5,
          comment: 'Chưa nhận được hàng nhưng review thử',
        }),
      ).rejects.toThrow('Chỉ đơn hàng đã giao thành công mới có thể gửi đánh giá');
    });

    it('should throw error if product is not in order', async () => {
      const useCase = new CreateReviewUseCase(mockReviewRepo, mockOrderRepo);
      await expect(
        useCase.execute({
          orderNumber: 'GP-883920',
          customerPhone: '0912345678',
          productId: 'prod_2', // prod_2 is not in deliveredOrder
          rating: 4,
          comment: 'Thử review sản phẩm khác',
        }),
      ).rejects.toThrow('Đơn hàng này không chứa sản phẩm cần đánh giá');
    });
  });
});
