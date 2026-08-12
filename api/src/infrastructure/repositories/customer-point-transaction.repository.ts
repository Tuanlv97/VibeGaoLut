import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerPointTransactionRepository } from '@domain/repositories/customer-point-transaction.repository.interface';
import { CustomerPointTransaction } from '@domain/entities/customer-point-transaction.entity';
import { CustomerPointTransactionOrmEntity } from '../database/entities/customer-point-transaction.orm-entity';
import { CustomerPointTransactionMapper } from '../database/mappers/customer-point-transaction.mapper';

@Injectable()
export class CustomerPointTransactionTypeOrmRepository implements ICustomerPointTransactionRepository {
  private inMemoryTransactions: CustomerPointTransaction[] = [];

  constructor(
    @Optional()
    @InjectRepository(CustomerPointTransactionOrmEntity)
    private readonly typeOrmRepo?: Repository<CustomerPointTransactionOrmEntity>,
  ) {}

  async findByCustomerId(customerId: string): Promise<CustomerPointTransaction[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { customerId },
          order: { createdAt: 'DESC' },
        });
        if (list.length > 0) return list.map(CustomerPointTransactionMapper.toDomain);
      } catch {}
    }

    return this.inMemoryTransactions
      .filter((t) => t.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async save(transaction: CustomerPointTransaction): Promise<CustomerPointTransaction> {
    if (this.typeOrmRepo) {
      try {
        const orm = CustomerPointTransactionMapper.toOrm(transaction);
        const saved = await this.typeOrmRepo.save(orm);
        return CustomerPointTransactionMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryTransactions.findIndex((t) => t.id === transaction.id);
    if (index >= 0) {
      this.inMemoryTransactions[index] = transaction;
    } else {
      this.inMemoryTransactions.push(transaction);
    }
    return transaction;
  }
}
