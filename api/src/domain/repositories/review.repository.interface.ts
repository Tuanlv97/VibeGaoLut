import { Review } from '../entities/review.entity';

export interface IReviewRepository {
  save(review: Review): Promise<Review>;
  findByProductId(productId: string): Promise<Review[]>;
}
