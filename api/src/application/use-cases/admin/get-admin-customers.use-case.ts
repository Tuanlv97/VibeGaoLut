import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Customer } from '@domain/entities/customer.entity';

export interface AdminCustomerDto {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  goldBalance: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  addresses: any[];
  totalOrders: number;
  totalSpent: number;
  orders?: any[];
}

export class GetAdminCustomersUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly orderRepository?: IOrderRepository,
  ) {}

  async execute(params?: { search?: string; status?: string }): Promise<AdminCustomerDto[]> {
    const customers = await this.customerRepository.findAll(params);
    let allOrders: any[] = [];
    if (this.orderRepository) {
      try {
        allOrders = await this.orderRepository.findAll();
      } catch {
        allOrders = [];
      }
    }

    return customers.map((c) => {
      // Find orders belonging to this customer by customerId, phone, or email
      const customerOrders = allOrders.filter(
        (o) =>
          o.customerId === c.id ||
          (o.customerPhone && o.customerPhone === c.phone) ||
          (o.customerEmail && o.customerEmail.toLowerCase() === c.email.toLowerCase()),
      );

      const totalOrders = customerOrders.length;
      const totalSpent = customerOrders.reduce(
        (sum, o) => (o.status !== 'CANCELLED' ? sum + Number(o.totalAmount || 0) : sum),
        0,
      );

      return {
        id: c.id,
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        loyaltyPoints: c.loyaltyPoints || 0,
        goldBalance: c.goldBalance || 0,
        isActive: c.isActive,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        addresses: c.addresses || [],
        totalOrders,
        totalSpent,
        orders: customerOrders.map((o) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          createdAt: o.createdAt,
          totalAmount: o.totalAmount,
          status: o.status,
        })),
      };
    });
  }
}
