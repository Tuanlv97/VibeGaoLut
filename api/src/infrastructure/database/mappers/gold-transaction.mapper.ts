import { GoldTransaction, GoldTransactionType, GoldTransactionStatus } from '@domain/entities/gold-transaction.entity';
import { GoldTransactionOrmEntity } from '../entities/gold-transaction.orm-entity';

export class GoldTransactionMapper {
  static toDomain(orm: GoldTransactionOrmEntity): GoldTransaction {
    return new GoldTransaction(
      orm.id,
      orm.customerId,
      orm.type as GoldTransactionType,
      Number(orm.amountVnd),
      Number(orm.goldAmount),
      Number(orm.balanceAfter),
      orm.description,
      orm.status as GoldTransactionStatus,
      orm.transferContent,
      orm.qrCodeUrl,
      new Date(orm.createdAt),
    );
  }

  static toOrm(domain: GoldTransaction): GoldTransactionOrmEntity {
    const orm = new GoldTransactionOrmEntity();
    orm.id = domain.id;
    orm.customerId = domain.customerId;
    orm.type = domain.type;
    orm.amountVnd = domain.amountVnd;
    orm.goldAmount = domain.goldAmount;
    orm.balanceAfter = domain.balanceAfter;
    orm.description = domain.description;
    orm.status = domain.status;
    orm.transferContent = domain.transferContent;
    orm.qrCodeUrl = domain.qrCodeUrl;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
