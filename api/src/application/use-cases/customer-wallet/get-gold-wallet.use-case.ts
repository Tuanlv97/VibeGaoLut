import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { ICustomerWalletRepository, ICUSTOMER_WALLET_REPOSITORY } from '@domain/repositories/customer-wallet.repository.interface';

@Injectable()
export class GetGoldWalletUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(ICUSTOMER_WALLET_REPOSITORY)
    private readonly walletRepo: ICustomerWalletRepository,
  ) {}

  async execute(customerId: string) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy tài khoản khách hàng.');
    }

    const transactions = await this.walletRepo.findTransactionsByCustomerId(customerId);

    return {
      goldBalance: customer.goldBalance,
      transactions: transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amountVnd: t.amountVnd,
        goldAmount: t.goldAmount,
        balanceAfter: t.balanceAfter,
        description: t.description,
        status: t.status,
        transferContent: t.transferContent,
        qrCodeUrl: t.qrCodeUrl,
        createdAt: t.createdAt,
      })),
    };
  }
}
