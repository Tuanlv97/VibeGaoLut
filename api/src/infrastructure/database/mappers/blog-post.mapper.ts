import { BlogPost } from '@domain/entities/blog-post.entity';
import { BlogPostOrmEntity } from '../entities/blog-post.orm-entity';

export class BlogPostMapper {
  static toDomain(ormEntity: BlogPostOrmEntity): BlogPost {
    return new BlogPost(
      ormEntity.id,
      ormEntity.categoryId,
      ormEntity.title,
      ormEntity.slug,
      ormEntity.excerpt,
      ormEntity.content,
      ormEntity.coverImage,
      ormEntity.authorName,
      ormEntity.readingTimeMinutes,
      ormEntity.isFeatured,
      new Date(ormEntity.publishedAt),
      new Date(ormEntity.createdAt),
      ormEntity.relatedProductIds || [],
    );
  }

  static toOrm(domainEntity: BlogPost): BlogPostOrmEntity {
    const ormEntity = new BlogPostOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.categoryId = domainEntity.categoryId;
    ormEntity.title = domainEntity.title;
    ormEntity.slug = domainEntity.slug;
    ormEntity.excerpt = domainEntity.excerpt;
    ormEntity.content = domainEntity.content;
    ormEntity.coverImage = domainEntity.coverImage;
    ormEntity.authorName = domainEntity.authorName;
    ormEntity.readingTimeMinutes = domainEntity.readingTimeMinutes;
    ormEntity.isFeatured = domainEntity.isFeatured;
    ormEntity.publishedAt = domainEntity.publishedAt;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.relatedProductIds = domainEntity.relatedProductIds;
    return ormEntity;
  }
}
