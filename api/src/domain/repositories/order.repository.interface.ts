import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findByOrderNumberAndPhone(orderNumber: string, phone: string): Promise<Order | null>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  findByPhone(phone: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
}

export const IORDER_REPOSITORY = 'IOrderRepository';
