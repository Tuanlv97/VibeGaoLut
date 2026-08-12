export type GoldTransactionType = 'TOPUP' | 'PAYMENT' | 'REFUND';
export type GoldTransactionStatus = 'PENDING' | 'SUCCESS' | 'REJECTED';

export class GoldTransaction {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly type: GoldTransactionType,
    public readonly amountVnd: number,
    public readonly goldAmount: number,
    public balanceAfter: number,
    public description: string,
    public status: GoldTransactionStatus = 'PENDING',
    public readonly transferContent?: string,
    public readonly qrCodeUrl?: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
