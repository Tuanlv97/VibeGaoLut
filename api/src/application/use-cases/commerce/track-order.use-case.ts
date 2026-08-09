import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';

export interface TrackOrderInput {
  orderNumber: string;
  customerPhone: string;
}

export class TrackOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(input: TrackOrderInput): Promise<Order | null> {
    if (!input.orderNumber || !input.customerPhone) {
      throw new Error('Vui lòng nhập Mã đơn hàng và Số điện thoại.');
    }
    return this.orderRepository.findByOrderNumberAndPhone(
      input.orderNumber.trim().toUpperCase(),
      input.customerPhone.trim(),
    );
  }
}
