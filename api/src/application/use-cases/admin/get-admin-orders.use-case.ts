import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';

export class GetAdminOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(status?: OrderStatus): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    if (status) {
      return orders.filter((o) => o.status === status);
    }
    return orders;
  }
}
