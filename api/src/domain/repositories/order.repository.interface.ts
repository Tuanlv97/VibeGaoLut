import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findByOrderNumberAndPhone(orderNumber: string, phone: string): Promise<Order | null>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
