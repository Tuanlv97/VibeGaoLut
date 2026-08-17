import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { Customer } from '@domain/entities/customer.entity';
import { CustomerOrmEntity } from '../database/entities/customer.orm-entity';
import { CustomerMapper } from '../database/mappers/customer.mapper';

@Injectable()
export class CustomerTypeOrmRepository implements ICustomerRepository {
  private inMemoryCustomers: Customer[] = [];

  constructor(
    @Optional()
    @InjectRepository(CustomerOrmEntity)
    private readonly typeOrmRepo?: Repository<CustomerOrmEntity>,
  ) {}

  async findById(id: string): Promise<Customer | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({
          where: { id },
          relations: { addresses: true },
        });
        if (found) return CustomerMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryCustomers.find((c) => c.id === id);
    return found || null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({
          where: { email: normalizedEmail },
          relations: { addresses: true },
        });
        if (found) return CustomerMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryCustomers.find((c) => c.email.toLowerCase() === normalizedEmail);
    return found || null;
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const normalizedPhone = phone.trim();
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({
          where: { phone: normalizedPhone },
          relations: { addresses: true },
        });
        if (found) return CustomerMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryCustomers.find((c) => c.phone.trim() === normalizedPhone);
    return found || null;
  }

  async findAll(params?: { search?: string; status?: string }): Promise<Customer[]> {
    let result: Customer[] = [];
    if (this.typeOrmRepo) {
      try {
        const query = this.typeOrmRepo.createQueryBuilder('customer')
          .leftJoinAndSelect('customer.addresses', 'addresses')
          .orderBy('customer.createdAt', 'DESC');

        if (params?.search) {
          const searchLower = `%${params.search.toLowerCase()}%`;
          query.andWhere(
            '(LOWER(customer.fullName) LIKE :search OR customer.phone LIKE :search OR LOWER(customer.email) LIKE :search)',
            { search: searchLower },
          );
        }

        if (params?.status === 'active') {
          query.andWhere('customer.isActive = :isActive', { isActive: true });
        } else if (params?.status === 'inactive') {
          query.andWhere('customer.isActive = :isActive', { isActive: false });
        }

        const found = await query.getMany();
        if (found && found.length > 0) {
          result = found.map((item) => CustomerMapper.toDomain(item));
        }
      } catch (err) {
        console.error('Error fetching customers from TypeORM:', err);
      }
    }

    if (result.length === 0) {
      result = [...this.inMemoryCustomers];
      if (params?.search) {
        const s = params.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.fullName.toLowerCase().includes(s) ||
            c.phone.includes(s) ||
            c.email.toLowerCase().includes(s),
        );
      }
      if (params?.status === 'active') {
        result = result.filter((c) => c.isActive);
      } else if (params?.status === 'inactive') {
        result = result.filter((c) => !c.isActive);
      }
    }

    return result;
  }

  async save(customer: Customer): Promise<Customer> {
    const index = this.inMemoryCustomers.findIndex((c) => c.id === customer.id);
    if (index >= 0) {
      this.inMemoryCustomers[index] = customer;
    } else {
      this.inMemoryCustomers.push(customer);
    }

    if (this.typeOrmRepo) {
      try {
        await this.typeOrmRepo.update(
          { id: customer.id },
          {
            goldBalance: customer.goldBalance,
            loyaltyPoints: customer.loyaltyPoints,
          },
        );
        const orm = CustomerMapper.toOrm(customer);
        const saved = await this.typeOrmRepo.save(orm);
        return CustomerMapper.toDomain(saved);
      } catch (err) {
        console.error('Error saving customer in TypeORM:', err);
      }
    }

    return customer;
  }

  async updatePoints(customerId: string, newPoints: number): Promise<void> {
    if (this.typeOrmRepo) {
      try {
        await this.typeOrmRepo.update({ id: customerId }, { loyaltyPoints: newPoints });
        return;
      } catch {}
    }

    const customer = this.inMemoryCustomers.find((c) => c.id === customerId);
    if (customer) {
      customer.loyaltyPoints = newPoints;
    }
  }
}
