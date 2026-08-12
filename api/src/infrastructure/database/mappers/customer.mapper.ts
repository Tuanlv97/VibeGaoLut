import { Customer } from '@domain/entities/customer.entity';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { CustomerAddressMapper } from './customer-address.mapper';

export class CustomerMapper {
  static toDomain(ormEntity: CustomerOrmEntity): Customer {
    const addresses = (ormEntity.addresses || []).map((addr) => CustomerAddressMapper.toDomain(addr));

    return new Customer(
      ormEntity.id,
      ormEntity.fullName,
      ormEntity.phone,
      ormEntity.email,
      ormEntity.passwordHash,
      ormEntity.loyaltyPoints || 0,
      Number(ormEntity.goldBalance) || 0,
      ormEntity.isActive,
      new Date(ormEntity.createdAt),
      new Date(ormEntity.updatedAt),
      addresses,
    );
  }

  static toOrm(domainEntity: Customer): CustomerOrmEntity {
    const ormEntity = new CustomerOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.fullName = domainEntity.fullName;
    ormEntity.phone = domainEntity.phone;
    ormEntity.email = domainEntity.email;
    ormEntity.passwordHash = domainEntity.passwordHash;
    ormEntity.loyaltyPoints = domainEntity.loyaltyPoints;
    ormEntity.goldBalance = domainEntity.goldBalance;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;

    ormEntity.addresses = (domainEntity.addresses || []).map((addr) => CustomerAddressMapper.toOrm(addr));
    return ormEntity;
  }
}
