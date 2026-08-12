import { CustomerAddress } from '../entities/customer-address.entity';

export interface ICustomerAddressRepository {
  findById(id: string): Promise<CustomerAddress | null>;
  findByCustomerId(customerId: string): Promise<CustomerAddress[]>;
  findDefaultByCustomerId(customerId: string): Promise<CustomerAddress | null>;
  save(address: CustomerAddress): Promise<CustomerAddress>;
  delete(id: string): Promise<void>;
  unsetOthersDefault(customerId: string, exceptAddressId?: string): Promise<void>;
}

export const ICUSTOMER_ADDRESS_REPOSITORY = 'ICustomerAddressRepository';
