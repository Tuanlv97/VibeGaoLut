import { CustomerPointTransaction, PointTransactionType } from '@domain/entities/customer-point-transaction.entity';
import { CustomerPointTransactionOrmEntity } from '../entities/customer-point-transaction.orm-entity';

export class CustomerPointTransactionMapper {
  static toDomain(ormEntity: CustomerPointTransactionOrmEntity): CustomerPointTransaction {
    return new CustomerPointTransaction(
      ormEntity.id,
      ormEntity.customerId,
      ormEntity.orderId,
      ormEntity.transactionType as PointTransactionType,
      ormEntity.points,
      ormEntity.balanceAfter,
      ormEntity.description,
      new Date(ormEntity.createdAt),
    );
  }

  static toOrm(domainEntity: CustomerPointTransaction): CustomerPointTransactionOrmEntity {
    const ormEntity = new CustomerPointTransactionOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.customerId = domainEntity.customerId;
    ormEntity.orderId = domainEntity.orderId;
    ormEntity.transactionType = domainEntity.transactionType;
    ormEntity.points = domainEntity.points;
    ormEntity.balanceAfter = domainEntity.balanceAfter;
    ormEntity.description = domainEntity.description;
    ormEntity.createdAt = domainEntity.createdAt;
    return ormEntity;
  }
}
