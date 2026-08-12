import { CustomerAddress } from './customer-address.entity';

export class Customer {
  constructor(
    public readonly id: string,
    public fullName: string,
    public phone: string,
    public email: string,
    public passwordHash: string,
    public loyaltyPoints: number = 0,
    public goldBalance: number = 0,
    public isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public addresses: CustomerAddress[] = [],
  ) {}
}
