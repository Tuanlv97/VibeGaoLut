import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReviewRepository } from '@domain/repositories/review.repository.interface';
import { Review } from '@domain/entities/review.entity';
import { ReviewOrmEntity } from '../database/entities/review.orm-entity';
import { ReviewMapper } from '../database/mappers/review.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class ReviewRepository implements IReviewRepository, OnModuleInit {
  private inMemoryReviews: Review[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(ReviewOrmEntity)
    private readonly typeOrmRepo?: Repository<ReviewOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryReviews = [...seederService.getReviews()];
    }
  }

  async onModuleInit() {
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const seeds = this.seederService.getReviews();
          for (const r of seeds) {
            await this.typeOrmRepo.save(ReviewMapper.toOrm(r));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async save(review: Review): Promise<Review> {
    if (this.typeOrmRepo) {
      try {
        const orm = ReviewMapper.toOrm(review);
        const saved = await this.typeOrmRepo.save(orm);
        return ReviewMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryReviews.findIndex((r) => r.id === review.id);
    if (index >= 0) {
      this.inMemoryReviews[index] = review;
    } else {
      this.inMemoryReviews.push(review);
    }
    return review;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { productId },
          order: { createdAt: 'DESC' },
        });
        if (list.length > 0) return list.map(ReviewMapper.toDomain);
      } catch {}
    }
    return this.inMemoryReviews.filter((r) => r.productId === productId);
  }
}
