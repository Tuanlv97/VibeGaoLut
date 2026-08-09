import { Review } from '@domain/entities/review.entity';
import { ReviewStatus } from '@domain/enums/review-status.enum';
import { ReviewOrmEntity } from '../entities/review.orm-entity';

export class ReviewMapper {
  static toDomain(ormEntity: ReviewOrmEntity): Review {
    return new Review(
      ormEntity.id,
      ormEntity.productId,
      ormEntity.orderId,
      ormEntity.customerName,
      ormEntity.rating,
      ormEntity.comment,
      ormEntity.images || [],
      ormEntity.status as ReviewStatus,
      new Date(ormEntity.createdAt),
    );
  }

  static toOrm(domainEntity: Review): ReviewOrmEntity {
    const ormEntity = new ReviewOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.productId = domainEntity.productId;
    ormEntity.orderId = domainEntity.orderId;
    ormEntity.customerName = domainEntity.customerName;
    ormEntity.rating = domainEntity.rating;
    ormEntity.comment = domainEntity.comment;
    ormEntity.images = domainEntity.images;
    ormEntity.status = domainEntity.status;
    ormEntity.createdAt = domainEntity.createdAt;
    return ormEntity;
  }
}
