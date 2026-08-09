import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '@domain/repositories/review.repository.interface';
import { Review } from '@domain/entities/review.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  private reviews: Review[] = [];

  constructor(private readonly seederService: SeederService) {
    this.reviews = [...seederService.getReviews()];
  }

  async save(review: Review): Promise<Review> {
    const index = this.reviews.findIndex((r) => r.id === review.id);
    if (index >= 0) {
      this.reviews[index] = review;
    } else {
      this.reviews.push(review);
    }
    return review;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviews.filter((r) => r.productId === productId);
  }
}
