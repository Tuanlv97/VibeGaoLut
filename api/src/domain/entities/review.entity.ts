import { ReviewStatus } from '../enums/review-status.enum';

export class Review {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly orderId: string,
    public customerName: string,
    public rating: number,
    public comment: string,
    public images: string[] = [],
    public status: ReviewStatus = ReviewStatus.PENDING,
    public readonly createdAt: Date = new Date(),
  ) {}
}
