import { CustomerPointTransaction } from '../entities/customer-point-transaction.entity';

export interface ICustomerPointTransactionRepository {
  findByCustomerId(customerId: string): Promise<CustomerPointTransaction[]>;
  save(transaction: CustomerPointTransaction): Promise<CustomerPointTransaction>;
}

export const ICUSTOMER_POINT_TRANSACTION_REPOSITORY = 'ICustomerPointTransactionRepository';
