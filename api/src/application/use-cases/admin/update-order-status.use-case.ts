import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    order.status = newStatus;
    return await this.orderRepository.save(order);
  }
}
