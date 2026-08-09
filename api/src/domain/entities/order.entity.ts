import { OrderStatus } from '../enums/order-status.enum';

export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly unitPrice: number,
    public readonly quantity: number,
    public readonly subtotal: number,
  ) {}
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly orderNumber: string,
    public customerName: string,
    public customerPhone: string,
    public customerEmail: string,
    public province: string,
    public district: string,
    public ward: string,
    public addressDetail: string,
    public subtotal: number,
    public shippingFee: number,
    public totalAmount: number,
    public paymentMethod: string = 'COD',
    public status: OrderStatus = OrderStatus.PENDING,
    public readonly createdAt: Date = new Date(),
    public items: OrderItem[] = [],
  ) {}

  public static generateOrderNumber(): string {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `GP-${randomDigits}`;
  }
}
