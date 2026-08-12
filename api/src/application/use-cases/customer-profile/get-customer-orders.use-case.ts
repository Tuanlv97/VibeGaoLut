import { Injectable, Inject, Optional } from '@nestjs/common';
import { IOrderRepository, IORDER_REPOSITORY } from '@domain/repositories/order.repository.interface';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { Order } from '@domain/entities/order.entity';

@Injectable()
export class GetCustomerOrdersUseCase {
  constructor(
    @Inject(IORDER_REPOSITORY)
    private readonly orderRepo: IOrderRepository,
    @Optional()
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo?: ICustomerRepository,
  ) {}

  async execute(customerId: string) {
    const orders = await this.orderRepo.findByCustomerId(customerId);
    
    if (this.customerRepo) {
      const customer = await this.customerRepo.findById(customerId);
      if (customer && customer.phone) {
        const phoneOrders = await this.orderRepo.findByPhone(customer.phone);
        const orderMap = new Map<string, Order>();
        orders.forEach((o) => orderMap.set(o.id, o));
        phoneOrders.forEach((o) => orderMap.set(o.id, o));
        return Array.from(orderMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
    }

    return orders;
  }
}
