import { Combo, ComboItem, ComboType } from '@domain/entities/combo.entity';
import { ComboOrmEntity } from '../entities/combo.orm-entity';
import { ComboItemOrmEntity } from '../entities/combo-item.orm-entity';

export class ComboMapper {
  static toDomain(ormEntity: ComboOrmEntity): Combo {
    const items = (ormEntity.items || []).map(
      (itemOrm) =>
        new ComboItem(
          itemOrm.id,
          itemOrm.comboId,
          itemOrm.productId,
          itemOrm.quantity,
          Number(itemOrm.unitPrice),
          itemOrm.product?.name,
          itemOrm.product?.images?.[0],
          itemOrm.product?.slug,
        ),
    );

    return new Combo(
      ormEntity.id,
      ormEntity.name,
      ormEntity.slug,
      ormEntity.comboType as ComboType,
      ormEntity.shortDescription,
      ormEntity.fullDescription,
      Number(ormEntity.originalPrice),
      Number(ormEntity.comboPrice),
      Number(ormEntity.savingsAmount),
      ormEntity.bannerUrl,
      ormEntity.mealPlanJson,
      ormEntity.isActive,
      items,
      new Date(ormEntity.createdAt),
    );
  }

  static toOrm(domainEntity: Combo): ComboOrmEntity {
    const ormEntity = new ComboOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.slug = domainEntity.slug;
    ormEntity.comboType = domainEntity.comboType;
    ormEntity.shortDescription = domainEntity.shortDescription;
    ormEntity.fullDescription = domainEntity.fullDescription;
    ormEntity.originalPrice = domainEntity.originalPrice;
    ormEntity.comboPrice = domainEntity.comboPrice;
    ormEntity.savingsAmount = domainEntity.savingsAmount;
    ormEntity.bannerUrl = domainEntity.bannerUrl;
    ormEntity.mealPlanJson = domainEntity.mealPlanJson;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;

    ormEntity.items = (domainEntity.items || []).map((itemDomain) => {
      const itemOrm = new ComboItemOrmEntity();
      itemOrm.id = itemDomain.id;
      itemOrm.comboId = itemDomain.comboId;
      itemOrm.productId = itemDomain.productId;
      itemOrm.quantity = itemDomain.quantity;
      itemOrm.unitPrice = itemDomain.unitPrice;
      return itemOrm;
    });

    return ormEntity;
  }
}
