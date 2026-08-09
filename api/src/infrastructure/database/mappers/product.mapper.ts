import { Product } from '@domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(ormEntity: ProductOrmEntity): Product {
    return new Product(
      ormEntity.id,
      ormEntity.categoryId,
      ormEntity.name,
      ormEntity.slug,
      Number(ormEntity.price),
      ormEntity.compareAtPrice ? Number(ormEntity.compareAtPrice) : null,
      ormEntity.stockQuantity,
      ormEntity.weightUnit,
      ormEntity.origin,
      ormEntity.ingredients,
      ormEntity.nutritionInfo,
      ormEntity.description,
      ormEntity.isFeaturedNew,
      new Date(ormEntity.releasedAt),
      new Date(ormEntity.createdAt),
      ormEntity.images || [],
    );
  }

  static toOrm(domainEntity: Product): ProductOrmEntity {
    const ormEntity = new ProductOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.categoryId = domainEntity.categoryId;
    ormEntity.name = domainEntity.name;
    ormEntity.slug = domainEntity.slug;
    ormEntity.price = domainEntity.price;
    ormEntity.compareAtPrice = domainEntity.compareAtPrice;
    ormEntity.stockQuantity = domainEntity.stockQuantity;
    ormEntity.weightUnit = domainEntity.weightUnit;
    ormEntity.origin = domainEntity.origin;
    ormEntity.ingredients = domainEntity.ingredients;
    ormEntity.nutritionInfo = domainEntity.nutritionInfo;
    ormEntity.description = domainEntity.description;
    ormEntity.isFeaturedNew = domainEntity.isFeaturedNew;
    ormEntity.releasedAt = domainEntity.releasedAt;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.images = domainEntity.images;
    return ormEntity;
  }
}
