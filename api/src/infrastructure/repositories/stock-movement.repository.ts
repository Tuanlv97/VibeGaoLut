import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStockMovementRepository } from '@domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '@domain/entities/stock-movement.entity';
import { StockMovementOrmEntity } from '../database/entities/stock-movement.orm-entity';
import { StockMovementMapper } from '../database/mappers/stock-movement.mapper';

@Injectable()
export class StockMovementRepository implements IStockMovementRepository {
  private inMemoryMovements: StockMovement[] = [];

  constructor(
    @Optional()
    @InjectRepository(StockMovementOrmEntity)
    private readonly typeOrmRepo?: Repository<StockMovementOrmEntity>,
  ) {}

  async save(movement: StockMovement): Promise<StockMovement> {
    if (this.typeOrmRepo) {
      try {
        const orm = StockMovementMapper.toOrm(movement);
        const saved = await this.typeOrmRepo.save(orm);
        const domain = StockMovementMapper.toDomain(saved);
        this.inMemoryMovements.unshift(domain);
        return domain;
      } catch {
        // Fallback to in-memory if DB is unavailable
      }
    }
    const existingIdx = this.inMemoryMovements.findIndex((m) => m.id === movement.id);
    if (existingIdx > -1) {
      this.inMemoryMovements[existingIdx] = movement;
    } else {
      this.inMemoryMovements.unshift(movement);
    }
    return movement;
  }

  async findAll(): Promise<StockMovement[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({ order: { createdAt: 'DESC' } });
        return list.map((item) => StockMovementMapper.toDomain(item));
      } catch {
        // Fallback
      }
    }
    return [...this.inMemoryMovements].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findByProductId(productId: string): Promise<StockMovement[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({
          where: { productId },
          order: { createdAt: 'DESC' },
        });
        return list.map((item) => StockMovementMapper.toDomain(item));
      } catch {
        // Fallback
      }
    }
    return this.inMemoryMovements
      .filter((m) => m.productId === productId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
