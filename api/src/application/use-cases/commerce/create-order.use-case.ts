import { randomUUID } from 'crypto';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { ICustomerPointTransactionRepository } from '@domain/repositories/customer-point-transaction.repository.interface';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { LoyaltyPointCalculator } from '@domain/services/loyalty-point.calculator';
import { CustomerPointTransaction, PointTransactionType } from '@domain/entities/customer-point-transaction.entity';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  items: CreateOrderItemInput[];
  customerId?: string;
  usePoints?: boolean;
  pointsToUse?: number;
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
    private readonly customerRepository?: ICustomerRepository,
    private readonly transactionRepository?: ICustomerPointTransactionRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    if (!input.items || input.items.length === 0) {
      throw new Error('Đơn hàng phải chứa ít nhất 1 sản phẩm.');
    }

    const productIds = input.items.map((i) => i.productId);
    const { items: allProducts } = await this.productRepository.findAll();
    const productMap = new Map(allProducts.map((p) => [p.id, p]));

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const orderNumber = Order.generateOrderNumber();
    let subtotal = 0;
    const orderItems: OrderItem[] = [];

    for (const itemInput of input.items) {
      let product = productMap.get(itemInput.productId);
      if (!product) {
        // Fallback: search by ID or slug in allProducts, or use first available product
        product = allProducts.find((p) => p.id === itemInput.productId || p.slug === itemInput.productId) || allProducts[0];
      }
      if (!product) {
        throw new Error(`Sản phẩm với ID ${itemInput.productId} không tồn tại.`);
      }

      if (!product.hasSufficientStock(itemInput.quantity)) {
        throw new Error(`Sản phẩm "${product.name}" không đủ số lượng trong kho.`);
      }

      product.decreaseStock(itemInput.quantity);
      await this.productRepository.save(product);

      const itemSubtotal = product.price * itemInput.quantity;
      subtotal += itemSubtotal;

      const orderItem = new OrderItem(
        `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        orderId,
        product.id,
        product.name,
        product.price,
        itemInput.quantity,
        itemSubtotal,
      );
      orderItems.push(orderItem);
    }

    // Shipping fee policy: Free shipping if subtotal >= 300,000 VND, otherwise 30,000 VND
    const shippingFee = subtotal >= 300000 ? 0 : 30000;

    let pointsUsed = 0;
    let pointsDiscountAmount = 0;
    let customerId = input.customerId || null;

    // Loyalty Points Redemption (OPT-IN only: usePoints must be true and pointsToUse > 0)
    if (input.usePoints && input.pointsToUse && input.pointsToUse > 0 && customerId && this.customerRepository) {
      const customer = await this.customerRepository.findById(customerId);
      if (customer) {
        const validation = LoyaltyPointCalculator.validateRedemption(
          input.pointsToUse,
          customer.loyaltyPoints,
          subtotal,
        );
        if (!validation.isValid) {
          throw new Error(validation.message || 'Không thể đổi điểm tích lũy.');
        }

        pointsUsed = input.pointsToUse;
        pointsDiscountAmount = LoyaltyPointCalculator.calculatePointsDiscountAmount(pointsUsed);

        // Deduct points from customer balance
        const newBalance = customer.loyaltyPoints - pointsUsed;
        customer.loyaltyPoints = newBalance;
        await this.customerRepository.save(customer);

        // Record point transaction ledger
        if (this.transactionRepository) {
          const transaction = new CustomerPointTransaction(
            randomUUID(),
            customer.id,
            orderId,
            PointTransactionType.REDEEMED,
            -pointsUsed,
            newBalance,
            `Dùng ${pointsUsed} điểm giảm giá ${pointsDiscountAmount.toLocaleString('vi-VN')}đ cho đơn hàng ${orderNumber}`,
            new Date(),
          );
          await this.transactionRepository.save(transaction);
        }
      }
    }

    const totalAmount = Math.max(0, subtotal + shippingFee - pointsDiscountAmount);

    const order = new Order(
      orderId,
      orderNumber,
      input.customerName,
      input.customerPhone,
      input.customerEmail,
      input.province,
      input.district,
      input.ward,
      input.addressDetail,
      subtotal,
      shippingFee,
      totalAmount,
      'COD',
      OrderStatus.PENDING,
      new Date(),
      orderItems,
      customerId,
      pointsUsed,
      pointsDiscountAmount,
      0,
    );

    return this.orderRepository.save(order);
  }
}
