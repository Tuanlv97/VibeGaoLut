import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { ICustomerWalletRepository, ICUSTOMER_WALLET_REPOSITORY } from '@domain/repositories/customer-wallet.repository.interface';

@Injectable()
export class ApproveTopupUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(ICUSTOMER_WALLET_REPOSITORY)
    private readonly walletRepo: ICustomerWalletRepository,
  ) {}

  async getPendingTopups() {
    return this.walletRepo.findPendingTopups();
  }

  async execute(transactionId: string, action: 'APPROVE' | 'REJECT') {
    const tx = await this.walletRepo.findTransactionById(transactionId);
    if (!tx) {
      throw new NotFoundException('Không tìm thấy giao dịch nạp tiền.');
    }

    if (tx.status !== 'PENDING') {
      throw new BadRequestException(`Giao dịch này đã ở trạng thái ${tx.status}.`);
    }

    const customer = await this.customerRepo.findById(tx.customerId);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng liên quan.');
    }

    if (action === 'APPROVE') {
      customer.goldBalance += tx.goldAmount;
      await this.customerRepo.save(customer);

      tx.status = 'SUCCESS';
      tx.balanceAfter = customer.goldBalance;
    } else {
      tx.status = 'REJECTED';
    }

    const updatedTx = await this.walletRepo.saveTransaction(tx);

    return {
      success: true,
      message: action === 'APPROVE' ? `Đã cộng ${tx.goldAmount} GOLD cho khách hàng ${customer.fullName}.` : 'Đã từ chối giao dịch nạp tiền.',
      transaction: updatedTx,
    };
  }
}
