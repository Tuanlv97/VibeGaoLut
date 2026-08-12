import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { ICustomerWalletRepository, ICUSTOMER_WALLET_REPOSITORY } from '@domain/repositories/customer-wallet.repository.interface';
import { GoldTransaction } from '@domain/entities/gold-transaction.entity';

export interface GenerateTopupQrDto {
  amountVnd: number;
}

@Injectable()
export class GenerateTopupQrUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(ICUSTOMER_WALLET_REPOSITORY)
    private readonly walletRepo: ICustomerWalletRepository,
  ) {}

  async execute(customerId: string, dto: GenerateTopupQrDto) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy tài khoản khách hàng.');
    }

    if (!dto.amountVnd || dto.amountVnd < 10000) {
      throw new BadRequestException('Số tiền nạp tối thiểu là 10.000 VNĐ.');
    }

    const goldAmount = Math.floor(dto.amountVnd / 1000); // 1.000 VNĐ = 1 GOLD
    const transferContent = `GP NAP ${customer.phone}`;
    const bankId = process.env.VIETQR_BANK_ID || 'MB';
    const accountNo = process.env.VIETQR_ACCOUNT_NO || '0978785678';
    const accountName = process.env.VIETQR_ACCOUNT_NAME || 'GREENPANTRY PLATFORM';

    const qrCodeUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${dto.amountVnd}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(accountName)}`;

    const transaction = new GoldTransaction(
      randomUUID(),
      customer.id,
      'TOPUP',
      dto.amountVnd,
      goldAmount,
      customer.goldBalance,
      `Yêu cầu nạp ${dto.amountVnd.toLocaleString('vi-VN')} VNĐ quy đổi ${goldAmount} GOLD`,
      'PENDING',
      transferContent,
      qrCodeUrl,
      new Date(),
    );

    const saved = await this.walletRepo.saveTransaction(transaction);

    return {
      transactionId: saved.id,
      amountVnd: saved.amountVnd,
      goldAmount: saved.goldAmount,
      transferContent: saved.transferContent,
      bankId,
      accountNo,
      accountName,
      qrCodeUrl: saved.qrCodeUrl,
      status: saved.status,
    };
  }
}
