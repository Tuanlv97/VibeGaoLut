import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';

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
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    if (!input.items || input.items.length === 0) {
      throw new Error('Đơn hàng phải chứa ít nhất 1 sản phẩm.');
    }

    const productIds = input.items.map((i) => i.productId);
    const products = await this.productRepository.findByIds(productIds);
    const productMap = new Map(products.map((p) => [p.id, p]));

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const orderNumber = Order.generateOrderNumber();
    let subtotal = 0;
    const orderItems: OrderItem[] = [];

    for (const itemInput of input.items) {
      const product = productMap.get(itemInput.productId);
      if (!product) {
        throw new Error(`Sản phẩm với ID ${itemInput.productId} không tồn tại.`);
      }

      if (!product.hasSufficientStock(itemInput.quantity)) {
        throw new Error(`Sản phẩm "${product.name}" không đủ số lượng trong kho.`);
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
    const totalAmount = subtotal + shippingFee;

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
    );

    return this.orderRepository.save(order);
  }
}
