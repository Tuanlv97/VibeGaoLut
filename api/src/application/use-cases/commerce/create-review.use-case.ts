import { IReviewRepository } from '@domain/repositories/review.repository.interface';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Review } from '@domain/entities/review.entity';
import { ReviewStatus } from '@domain/enums/review-status.enum';
import { OrderStatus } from '@domain/enums/order-status.enum';

export interface CreateReviewInput {
  orderNumber: string;
  customerPhone: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export class CreateReviewUseCase {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(input: CreateReviewInput): Promise<Review> {
    const order = await this.orderRepository.findByOrderNumberAndPhone(
      input.orderNumber.trim().toUpperCase(),
      input.customerPhone.trim(),
    );

    if (!order) {
      throw new Error('Mã đơn hàng hoặc Số điện thoại không hợp lệ.');
    }

    if (order.status !== OrderStatus.DELIVERED) {
      throw new Error('Chỉ đơn hàng đã giao thành công mới có thể gửi đánh giá.');
    }

    const hasProductInOrder = order.items.some((item) => item.productId === input.productId);
    if (!hasProductInOrder) {
      throw new Error('Đơn hàng này không chứa sản phẩm cần đánh giá.');
    }

    if (input.rating < 1 || input.rating > 5) {
      throw new Error('Đánh giá phải từ 1 đến 5 sao.');
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const review = new Review(
      reviewId,
      input.productId,
      order.id,
      order.customerName,
      input.rating,
      input.comment,
      input.images || [],
      ReviewStatus.PENDING,
      new Date(),
    );

    return this.reviewRepository.save(review);
  }
}
