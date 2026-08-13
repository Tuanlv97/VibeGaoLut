export type MovementType = 'INWARD' | 'OUTWARD';

export class StockMovement {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly type: MovementType,
    public readonly quantity: number,
    public readonly unitCost: number = 0,
    public readonly supplier: string = '',
    public readonly note: string = '',
    public readonly createdByName: string = 'System Admin',
    public readonly createdAt: Date = new Date(),
  ) {}
}
