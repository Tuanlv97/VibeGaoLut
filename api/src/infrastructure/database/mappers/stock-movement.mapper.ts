import { StockMovement } from '@domain/entities/stock-movement.entity';
import { StockMovementOrmEntity } from '../entities/stock-movement.orm-entity';

export class StockMovementMapper {
  static toDomain(orm: StockMovementOrmEntity): StockMovement {
    return new StockMovement(
      orm.id,
      orm.productId,
      orm.productName,
      orm.type,
      Number(orm.quantity),
      Number(orm.unitCost),
      orm.supplier,
      orm.note,
      orm.createdByName,
      orm.createdAt,
    );
  }

  static toOrm(domain: StockMovement): StockMovementOrmEntity {
    const orm = new StockMovementOrmEntity();
    orm.id = domain.id;
    orm.productId = domain.productId;
    orm.productName = domain.productName;
    orm.type = domain.type;
    orm.quantity = domain.quantity;
    orm.unitCost = domain.unitCost;
    orm.supplier = domain.supplier;
    orm.note = domain.note;
    orm.createdByName = domain.createdByName;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
