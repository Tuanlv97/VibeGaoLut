import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository, IORDER_REPOSITORY } from '@domain/repositories/order.repository.interface';

@Injectable()
export class GetCustomerOrdersUseCase {
  constructor(
    @Inject(IORDER_REPOSITORY)
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(customerId: string) {
    const orders = await this.orderRepo.findByCustomerId(customerId);
    return orders;
  }
}
