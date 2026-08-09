import { Category } from '@domain/entities/category.entity';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class CategoryMapper {
  static toDomain(ormEntity: CategoryOrmEntity): Category {
    return new Category(
      ormEntity.id,
      ormEntity.name,
      ormEntity.slug,
      ormEntity.description,
      ormEntity.imageUrl,
      ormEntity.isActive,
      ormEntity.createdAt,
    );
  }

  static toOrm(domainEntity: Category): CategoryOrmEntity {
    const ormEntity = new CategoryOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.slug = domainEntity.slug;
    ormEntity.description = domainEntity.description;
    ormEntity.imageUrl = domainEntity.imageUrl;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    return ormEntity;
  }
}
