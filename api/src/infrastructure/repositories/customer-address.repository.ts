import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerAddressRepository } from '@domain/repositories/customer-address.repository.interface';
import { CustomerAddress } from '@domain/entities/customer-address.entity';
import { CustomerAddressOrmEntity } from '../database/entities/customer-address.orm-entity';
import { CustomerAddressMapper } from '../database/mappers/customer-address.mapper';

@Injectable()
export class CustomerAddressTypeOrmRepository implements ICustomerAddressRepository {
  private inMemoryAddresses: CustomerAddress[] = [];

  constructor(
    @Optional()
    @InjectRepository(CustomerAddressOrmEntity)
    private readonly typeOrmRepo?: Repository<CustomerAddressOrmEntity>,
  ) {}

  async findById(id: string): Promise<CustomerAddress | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return CustomerAddressMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryAddresses.find((a) => a.id === id);
    return found || null;
  }

  async findByCustomerId(customerId: string): Promise<CustomerAddress[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { customerId },
          order: { isDefault: 'DESC', createdAt: 'DESC' },
        });
        if (list.length > 0) return list.map(CustomerAddressMapper.toDomain);
      } catch {}
    }
    return this.inMemoryAddresses.filter((a) => a.customerId === customerId);
  }

  async findDefaultByCustomerId(customerId: string): Promise<CustomerAddress | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({
          where: { customerId, isDefault: true },
        });
        if (found) return CustomerAddressMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryAddresses.find((a) => a.customerId === customerId && a.isDefault);
    return found || null;
  }

  async save(address: CustomerAddress): Promise<CustomerAddress> {
    if (this.typeOrmRepo) {
      try {
        const orm = CustomerAddressMapper.toOrm(address);
        const saved = await this.typeOrmRepo.save(orm);
        return CustomerAddressMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryAddresses.findIndex((a) => a.id === address.id);
    if (index >= 0) {
      this.inMemoryAddresses[index] = address;
    } else {
      this.inMemoryAddresses.push(address);
    }
    return address;
  }

  async delete(id: string): Promise<void> {
    if (this.typeOrmRepo) {
      try {
        await this.typeOrmRepo.delete({ id });
        return;
      } catch {}
    }
    this.inMemoryAddresses = this.inMemoryAddresses.filter((a) => a.id !== id);
  }

  async unsetOthersDefault(customerId: string, exceptAddressId?: string): Promise<void> {
    if (this.typeOrmRepo) {
      try {
        const qb = this.typeOrmRepo.createQueryBuilder()
          .update(CustomerAddressOrmEntity)
          .set({ isDefault: false })
          .where('customerId = :customerId', { customerId });

        if (exceptAddressId) {
          qb.andWhere('id != :exceptAddressId', { exceptAddressId });
        }

        await qb.execute();
        return;
      } catch {}
    }

    for (const addr of this.inMemoryAddresses) {
      if (addr.customerId === customerId && addr.id !== exceptAddressId) {
        addr.isDefault = false;
      }
    }
  }
}
