import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findByPhone(phone: string): Promise<Customer | null>;
  findAll(params?: { search?: string; status?: string }): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
  updatePoints(customerId: string, newPoints: number): Promise<void>;
}

export const ICUSTOMER_REPOSITORY = 'ICustomerRepository';
