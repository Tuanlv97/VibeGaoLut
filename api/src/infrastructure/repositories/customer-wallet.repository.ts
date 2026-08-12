import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerWalletRepository } from '@domain/repositories/customer-wallet.repository.interface';
import { GoldTransaction } from '@domain/entities/gold-transaction.entity';
import { GoldTransactionOrmEntity } from '../database/entities/gold-transaction.orm-entity';
import { GoldTransactionMapper } from '../database/mappers/gold-transaction.mapper';

@Injectable()
export class CustomerWalletTypeOrmRepository implements ICustomerWalletRepository {
  private inMemoryTransactions: GoldTransaction[] = [];

  constructor(
    @Optional()
    @InjectRepository(GoldTransactionOrmEntity)
    private readonly typeOrmRepo?: Repository<GoldTransactionOrmEntity>,
  ) {}

  async saveTransaction(tx: GoldTransaction): Promise<GoldTransaction> {
    if (this.typeOrmRepo) {
      try {
        const orm = GoldTransactionMapper.toOrm(tx);
        const saved = await this.typeOrmRepo.save(orm);
        return GoldTransactionMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryTransactions.findIndex((t) => t.id === tx.id);
    if (index >= 0) {
      this.inMemoryTransactions[index] = tx;
    } else {
      this.inMemoryTransactions.push(tx);
    }
    return tx;
  }

  async findTransactionsByCustomerId(customerId: string): Promise<GoldTransaction[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { customerId },
          order: { createdAt: 'DESC' },
        });
        return list.map((item) => GoldTransactionMapper.toDomain(item));
      } catch {}
    }

    return this.inMemoryTransactions
      .filter((t) => t.customerId === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findPendingTopups(): Promise<GoldTransaction[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { type: 'TOPUP', status: 'PENDING' },
          order: { createdAt: 'DESC' },
        });
        return list.map((item) => GoldTransactionMapper.toDomain(item));
      } catch {}
    }

    return this.inMemoryTransactions
      .filter((t) => t.type === 'TOPUP' && t.status === 'PENDING')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findTransactionById(id: string): Promise<GoldTransaction | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return GoldTransactionMapper.toDomain(found);
      } catch {}
    }

    const found = this.inMemoryTransactions.find((t) => t.id === id);
    return found || null;
  }
}
