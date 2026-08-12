import { CustomerAddress } from '@domain/entities/customer-address.entity';
import { CustomerAddressOrmEntity } from '../entities/customer-address.orm-entity';

export class CustomerAddressMapper {
  static toDomain(ormEntity: CustomerAddressOrmEntity): CustomerAddress {
    return new CustomerAddress(
      ormEntity.id,
      ormEntity.customerId,
      ormEntity.recipientName,
      ormEntity.phone,
      ormEntity.province,
      ormEntity.district,
      ormEntity.ward,
      ormEntity.addressDetail,
      ormEntity.isDefault,
      new Date(ormEntity.createdAt),
    );
  }

  static toOrm(domainEntity: CustomerAddress): CustomerAddressOrmEntity {
    const ormEntity = new CustomerAddressOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.customerId = domainEntity.customerId;
    ormEntity.recipientName = domainEntity.recipientName;
    ormEntity.phone = domainEntity.phone;
    ormEntity.province = domainEntity.province;
    ormEntity.district = domainEntity.district;
    ormEntity.ward = domainEntity.ward;
    ormEntity.addressDetail = domainEntity.addressDetail;
    ormEntity.isDefault = domainEntity.isDefault;
    ormEntity.createdAt = domainEntity.createdAt;
    return ormEntity;
  }
}
