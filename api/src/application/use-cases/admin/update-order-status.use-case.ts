import { randomUUID } from 'crypto';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { ICustomerPointTransactionRepository } from '@domain/repositories/customer-point-transaction.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IStockMovementRepository } from '@domain/repositories/stock-movement.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { LoyaltyPointCalculator } from '@domain/services/loyalty-point.calculator';
import { CustomerPointTransaction, PointTransactionType } from '@domain/entities/customer-point-transaction.entity';
import { StockMovement } from '@domain/entities/stock-movement.entity';

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly customerRepository?: ICustomerRepository,
    private readonly transactionRepository?: ICustomerPointTransactionRepository,
    private readonly walletRepository?: any,
    private readonly productRepository?: IProductRepository,
    private readonly stockMovementRepository?: IStockMovementRepository,
  ) {}

  async execute(orderId: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    const oldStatus = order.status;
    order.status = newStatus;

    // Handle point crediting & GOLD reward conversion when order is DELIVERED
    if (newStatus === OrderStatus.DELIVERED && oldStatus !== OrderStatus.DELIVERED && order.customerId && this.customerRepository) {
      const pointsEarned = order.pointsEarned || LoyaltyPointCalculator.calculatePointsEarned(order.subtotal);
      if (pointsEarned > 0) {
        order.pointsEarned = pointsEarned;
        const customer = await this.customerRepository.findById(order.customerId);
        if (customer) {
          customer.loyaltyPoints += pointsEarned;

          // Convert points to GOLD (10 points = 1 GOLD = 1,000 VNĐ)
          const goldEarned = Math.floor(pointsEarned / 10);
          if (goldEarned > 0) {
            customer.goldBalance += goldEarned;

            if (this.walletRepository) {
              await this.walletRepository.saveTransaction({
                id: randomUUID(),
                customerId: customer.id,
                type: 'REWARD',
                amountVnd: goldEarned * 1000,
                goldAmount: goldEarned,
                balanceAfter: customer.goldBalance,
                description: `Tích +${goldEarned} GOLD (${pointsEarned} điểm) từ đơn hàng giao thành công ${order.orderNumber}`,
                status: 'SUCCESS',
                createdAt: new Date(),
              });
            }
          }

          await this.customerRepository.save(customer);

          if (this.transactionRepository) {
            const tx = new CustomerPointTransaction(
              randomUUID(),
              customer.id,
              order.id,
              PointTransactionType.EARNED,
              pointsEarned,
              customer.loyaltyPoints,
              `Tích +${pointsEarned} điểm (+${goldEarned} GOLD) từ đơn hàng ${order.orderNumber}`,
              new Date(),
            );
            await this.transactionRepository.save(tx);
          }
        }
      }
    }

    // Handle point refunding & GOLD refunding & Auto Stock Restock when order is CANCELLED
    if (newStatus === OrderStatus.CANCELLED && oldStatus !== OrderStatus.CANCELLED) {
      // 1. Auto Restock products back to warehouse
      if (this.productRepository && order.items && order.items.length > 0) {
        for (const item of order.items) {
          try {
            const product = await this.productRepository.findById(item.productId);
            if (product) {
              product.stockQuantity += item.quantity;
              await this.productRepository.save(product);

              if (this.stockMovementRepository) {
                const movement = new StockMovement(
                  randomUUID(),
                  product.id,
                  product.name,
                  'INWARD',
                  item.quantity,
                  0,
                  'Order Cancellation',
                  `Hoàn kho do đơn hàng #${order.orderNumber} bị hủy`,
                  'System Auto-Restock',
                  new Date(),
                );
                await this.stockMovementRepository.save(movement);
              }
            }
          } catch {
            // Ignore individual restock failures to allow order status update
          }
        }
      }

      // 2. Refund points & GOLD for customer account
      if (order.customerId && this.customerRepository) {
        const customer = await this.customerRepository.findById(order.customerId);
        if (customer) {
          // Refund loyalty points
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

          // Refund GOLD if order was paid with GOLD_WALLET
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
    }

    return await this.orderRepository.save(order);
  }
}

