import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { OrderStatus } from '@domain/enums/order-status.enum';

export interface AdminStatsResult {
  totalRevenue: number;
  totalOrders: number;
  pendingOrdersCount: number;
  totalProducts: number;
}

export class GetAdminStatsUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<AdminStatsResult> {
    const orders = await this.orderRepository.findAll();
    const productsResult = await this.productRepository.findAll({ limit: 1000 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
      // Add to revenue if order is not cancelled
      if (order.status !== OrderStatus.CANCELLED) {
        return sum + order.totalAmount;
      }
      return sum;
    }, 0);

    const pendingOrdersCount = orders.filter((o) => o.status === OrderStatus.PENDING).length;
    const totalProducts = productsResult.total;

    return {
      totalRevenue,
      totalOrders,
      pendingOrdersCount,
      totalProducts,
    };
  }
}
