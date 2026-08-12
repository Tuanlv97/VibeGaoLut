import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { ICustomerPointTransactionRepository, ICUSTOMER_POINT_TRANSACTION_REPOSITORY } from '@domain/repositories/customer-point-transaction.repository.interface';

@Injectable()
export class GetCustomerPointsHistoryUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(ICUSTOMER_POINT_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: ICustomerPointTransactionRepository,
  ) {}

  async execute(customerId: string) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy thông tin khách hàng.');
    }

    const transactions = await this.transactionRepo.findByCustomerId(customerId);

    return {
      currentPoints: customer.loyaltyPoints,
      transactions: transactions.map((t) => ({
        id: t.id,
        orderId: t.orderId,
        transactionType: t.transactionType,
        points: t.points,
        balanceAfter: t.balanceAfter,
        description: t.description,
        createdAt: t.createdAt,
      })),
    };
  }
}
