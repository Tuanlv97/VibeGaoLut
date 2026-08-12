import { GoldTransaction } from '../entities/gold-transaction.entity';

export interface ICustomerWalletRepository {
  saveTransaction(tx: GoldTransaction): Promise<GoldTransaction>;
  findTransactionsByCustomerId(customerId: string): Promise<GoldTransaction[]>;
  findPendingTopups(): Promise<GoldTransaction[]>;
  findTransactionById(id: string): Promise<GoldTransaction | null>;
}

export const ICUSTOMER_WALLET_REPOSITORY = 'ICustomerWalletRepository';
