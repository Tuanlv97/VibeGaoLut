import { randomUUID } from 'crypto';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { ICustomerPointTransactionRepository } from '@domain/repositories/customer-point-transaction.repository.interface';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { LoyaltyPointCalculator } from '@domain/services/loyalty-point.calculator';
import { Customer } from '@domain/entities/customer.entity';
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
  district?: string;
  ward: string;
  addressDetail: string;
  items: CreateOrderItemInput[];
  paymentMethod?: string;
  customerId?: string;
  usePoints?: boolean;
  pointsToUse?: number;
  goldToUse?: number;
}

import { IStockMovementRepository } from '@domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '@domain/entities/stock-movement.entity';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
    private readonly customerRepository?: ICustomerRepository,
    private readonly transactionRepository?: ICustomerPointTransactionRepository,
    private readonly walletRepository?: any,
    private readonly stockMovementRepository?: IStockMovementRepository,
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
        throw new Error(`Sản phẩm "${product.name}" không đủ số lượng trong kho. Hiện chỉ còn ${product.stockQuantity} túi (bạn chọn ${itemInput.quantity} túi).`);
      }

      product.decreaseStock(itemInput.quantity);
      await this.productRepository.save(product);

      // Record OUTWARD stock movement
      if (this.stockMovementRepository) {
        try {
          const movement = new StockMovement(
            randomUUID(),
            product.id,
            product.name,
            'OUTWARD',
            itemInput.quantity,
            0,
            'Guest Checkout',
            `Xuất kho bán cho đơn hàng #${orderNumber}`,
            input.customerName || 'Khách hàng',
            new Date(),
          );
          await this.stockMovementRepository.save(movement);
        } catch {
          // Ignore log failure
        }
      }

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
    let goldUsed = 0;
    let goldDiscountAmount = 0;
    let customer: Customer | null = null;

    if (this.customerRepository) {
      if (input.customerId) {
        customer = await this.customerRepository.findById(input.customerId);
      }
      if (!customer && input.customerPhone) {
        customer = await this.customerRepository.findByPhone(input.customerPhone);
      }
      if (!customer && input.customerEmail) {
        customer = await this.customerRepository.findByEmail(input.customerEmail);
      }
    }

    const customerId = customer?.id || input.customerId || null;

    // Loyalty Points Redemption (OPT-IN only: usePoints must be true and pointsToUse > 0)
    if (input.usePoints && input.pointsToUse && input.pointsToUse > 0 && customer && this.customerRepository) {
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

    // GOLD Balance Discount (OPT-IN: goldToUse > 0)
    if (input.goldToUse && input.goldToUse > 0 && customer && this.customerRepository) {
      if (input.goldToUse > customer.goldBalance) {
        throw new Error(`Số GOLD sử dụng (${input.goldToUse} GOLD) vượt quá số dư hiện có (${customer.goldBalance} GOLD).`);
      }

      goldUsed = input.goldToUse;
      goldDiscountAmount = goldUsed * 1000; // 1 GOLD = 1.000 VNĐ

      customer.goldBalance -= goldUsed;
      await this.customerRepository.save(customer);

      if (this.walletRepository) {
        await this.walletRepository.saveTransaction({
          id: randomUUID(),
          customerId: customer.id,
          type: 'REDEEM',
          amountVnd: goldDiscountAmount,
          goldAmount: -goldUsed,
          balanceAfter: customer.goldBalance,
          description: `Dùng ${goldUsed} GOLD giảm giá ${goldDiscountAmount.toLocaleString('vi-VN')}đ cho đơn hàng ${orderNumber}`,
          status: 'SUCCESS',
          createdAt: new Date(),
        });
      }
    }

    const totalAmount = Math.max(0, subtotal + shippingFee - pointsDiscountAmount - goldDiscountAmount);
    const paymentMethod = input.paymentMethod || 'COD';
    let initialOrderStatus = OrderStatus.PENDING;

    // Handle GOLD_WALLET Payment
    if (paymentMethod === 'GOLD_WALLET') {
      if (!customer || !this.customerRepository) {
        throw new Error('Vui lòng đăng nhập để sử dụng thanh toán bằng Ví GOLD.');
      }

      const goldRequired = Math.ceil(totalAmount / 1000); // 1 GOLD = 1.000 VNĐ
      if (customer.goldBalance < goldRequired) {
        throw new Error(`Số dư Ví GOLD không đủ (${customer.goldBalance} GOLD). Bạn cần thêm ${goldRequired - customer.goldBalance} GOLD nữa để thanh toán.`);
      }

      customer.goldBalance -= goldRequired;
      await this.customerRepository.save(customer);

      if (this.walletRepository) {
        await this.walletRepository.saveTransaction({
          id: randomUUID(),
          customerId: customer.id,
          type: 'PAYMENT',
          amountVnd: totalAmount,
          goldAmount: -goldRequired,
          balanceAfter: customer.goldBalance,
          description: `Thanh toán đơn hàng ${orderNumber} bằng Ví GOLD`,
          status: 'SUCCESS',
          createdAt: new Date(),
        });
      }

      initialOrderStatus = OrderStatus.PROCESSING;
    }

    const pointsEarned = LoyaltyPointCalculator.calculatePointsEarned(subtotal);

    const order = new Order(
      orderId,
      orderNumber,
      input.customerName,
      input.customerPhone,
      input.customerEmail,
      input.province,
      input.district || '',
      input.ward,
      input.addressDetail,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod,
      initialOrderStatus,
      new Date(),
      orderItems,
      customerId,
      pointsUsed,
      pointsDiscountAmount,
      pointsEarned,
    );

    return this.orderRepository.save(order);
  }
}

