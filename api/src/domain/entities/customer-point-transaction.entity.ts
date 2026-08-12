export enum PointTransactionType {
  EARNED = 'EARNED',
  REDEEMED = 'REDEEMED',
  REFUNDED = 'REFUNDED',
  ADMIN_ADJUSTMENT = 'ADMIN_ADJUSTMENT',
}

export class CustomerPointTransaction {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly orderId: string | null,
    public readonly transactionType: PointTransactionType,
    public readonly points: number, // Positive for EARNED/REFUNDED, Negative for REDEEMED
    public readonly balanceAfter: number,
    public readonly description: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
