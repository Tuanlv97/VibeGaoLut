import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  constructor(private readonly seederService: SeederService) {
    this.orders = [...seederService.getOrders()];
  }

  async save(order: Order): Promise<Order> {
    const index = this.orders.findIndex((o) => o.id === order.id || o.orderNumber === order.orderNumber);
    if (index >= 0) {
      this.orders[index] = order;
    } else {
      this.orders.push(order);
    }
    return order;
  }

  async findByOrderNumberAndPhone(orderNumber: string, phone: string): Promise<Order | null> {
    const normalizedNum = orderNumber.trim().toUpperCase();
    const normalizedPhone = phone.trim();
    const found = this.orders.find(
      (o) => o.orderNumber.toUpperCase() === normalizedNum && o.customerPhone.trim() === normalizedPhone,
    );
    return found || null;
  }

  async findById(id: string): Promise<Order | null> {
    const found = this.orders.find((o) => o.id === id);
    return found || null;
  }

  async findAll(): Promise<Order[]> {
    return [...this.orders];
  }
}
