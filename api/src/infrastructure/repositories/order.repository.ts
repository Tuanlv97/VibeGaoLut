import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderOrmEntity } from '../database/entities/order.orm-entity';
import { OrderMapper } from '../database/mappers/order.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class OrderRepository implements IOrderRepository, OnModuleInit {
  private inMemoryOrders: Order[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(OrderOrmEntity)
    private readonly typeOrmRepo?: Repository<OrderOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryOrders = [...seederService.getOrders()];
    }
  }

  async onModuleInit() {
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const seeds = this.seederService.getOrders();
          for (const o of seeds) {
            await this.typeOrmRepo.save(OrderMapper.toOrm(o));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async save(order: Order): Promise<Order> {
    if (this.typeOrmRepo) {
      try {
        const orm = OrderMapper.toOrm(order);
        const saved = await this.typeOrmRepo.save(orm);
        return OrderMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryOrders.findIndex(
      (o) => o.id === order.id || o.orderNumber === order.orderNumber,
    );
    if (index >= 0) {
      this.inMemoryOrders[index] = order;
    } else {
      this.inMemoryOrders.push(order);
    }
    return order;
  }

  async findByOrderNumberAndPhone(orderNumber: string, phone: string): Promise<Order | null> {
    const normalizedNum = orderNumber.trim().toUpperCase();
    const normalizedPhone = phone.trim();

    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({
          where: { orderNumber: normalizedNum, customerPhone: normalizedPhone },
        });
        if (found) return OrderMapper.toDomain(found);
      } catch {}
    }

    const found = this.inMemoryOrders.find(
      (o) => o.orderNumber.toUpperCase() === normalizedNum && o.customerPhone.trim() === normalizedPhone,
    );
    return found || null;
  }

  async findById(id: string): Promise<Order | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return OrderMapper.toDomain(found);
      } catch {}
    }
    const found = this.inMemoryOrders.find((o) => o.id === id);
    return found || null;
  }

  async findAll(): Promise<Order[]> {
    if (this.typeOrmRepo) {
      try {
        const list = await this.typeOrmRepo.find({ order: { createdAt: 'DESC' } });
        if (list.length > 0) return list.map(OrderMapper.toDomain);
      } catch {}
    }
    return [...this.inMemoryOrders];
  }
}
