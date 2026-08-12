import { randomUUID } from 'crypto';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { ICustomerPointTransactionRepository } from '@domain/repositories/customer-point-transaction.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { LoyaltyPointCalculator } from '@domain/services/loyalty-point.calculator';
import { CustomerPointTransaction, PointTransactionType } from '@domain/entities/customer-point-transaction.entity';

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly customerRepository?: ICustomerRepository,
    private readonly transactionRepository?: ICustomerPointTransactionRepository,
    private readonly walletRepository?: any,
  ) {}

  async execute(orderId: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    const oldStatus = order.status;
    order.status = newStatus;

    // Handle point crediting when order is DELIVERED
    if (newStatus === OrderStatus.DELIVERED && oldStatus !== OrderStatus.DELIVERED && order.customerId && this.customerRepository) {
      if (order.pointsEarned === 0) {
        const pointsEarned = LoyaltyPointCalculator.calculatePointsEarned(order.subtotal);
        if (pointsEarned > 0) {
          order.pointsEarned = pointsEarned;
          const customer = await this.customerRepository.findById(order.customerId);
          if (customer) {
            customer.loyaltyPoints += pointsEarned;
            await this.customerRepository.save(customer);

            if (this.transactionRepository) {
              const tx = new CustomerPointTransaction(
                randomUUID(),
                customer.id,
                order.id,
                PointTransactionType.EARNED,
                pointsEarned,
                customer.loyaltyPoints,
                `Tích +${pointsEarned} điểm từ đơn hàng ${order.orderNumber}`,
                new Date(),
              );
              await this.transactionRepository.save(tx);
            }
          }
        }
      }
    }

    // Handle point refunding & GOLD refunding when order is CANCELLED
    if (newStatus === OrderStatus.CANCELLED && oldStatus !== OrderStatus.CANCELLED && order.customerId && this.customerRepository) {
      const customer = await this.customerRepository.findById(order.customerId);
      if (customer) {
        // 1. Refund loyalty points
        if (order.pointsUsed > 0) {
          customer.loyaltyPoints += order.pointsUsed;
          if (this.transactionRepository) {
            const tx = new CustomerPointTransaction(
              randomUUID(),
              customer.id,
              order.id,
              PointTransactionType.REFUNDED,
              order.pointsUsed,
              customer.loyaltyPoints,
              `Hoàn +${order.pointsUsed} điểm từ đơn hàng bị hủy ${order.orderNumber}`,
              new Date(),
            );
            await this.transactionRepository.save(tx);
          }
        }

        // 2. Refund GOLD if order was paid with GOLD_WALLET
        if (order.paymentMethod === 'GOLD_WALLET') {
          const goldToRefund = Math.ceil(order.totalAmount / 1000);
          customer.goldBalance += goldToRefund;

          if (this.walletRepository) {
            await this.walletRepository.saveTransaction({
              id: randomUUID(),
              customerId: customer.id,
              type: 'REFUND',
              amountVnd: order.totalAmount,
              goldAmount: goldToRefund,
              balanceAfter: customer.goldBalance,
              description: `Hoàn +${goldToRefund} GOLD từ đơn hàng bị hủy ${order.orderNumber}`,
              status: 'SUCCESS',
              createdAt: new Date(),
            });
          }
        }

        await this.customerRepository.save(customer);
      }
    }

    return await this.orderRepository.save(order);
  }
}
