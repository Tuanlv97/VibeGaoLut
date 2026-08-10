export class Product {
  constructor(
    public readonly id: string,
    public categoryId: string,
    public name: string,
    public slug: string,
    public price: number,
    public compareAtPrice: number | null,
    public stockQuantity: number,
    public weightUnit: string,
    public origin: string,
    public ingredients: string,
    public nutritionInfo: string,
    public description: string,
    public isFeaturedNew: boolean,
    public releasedAt: Date,
    public readonly createdAt: Date = new Date(),
    public images: string[] = [],
  ) {}

  /**
   * Hybrid Domain Rule BR-EC-01:
   * A product is considered a New Arrival if:
   * 1. releasedAt is within 30 days from referenceDate, OR
   * 2. isFeaturedNew flag is set to true by Admin.
   */
  public isNewArrival(referenceDate: Date = new Date()): boolean {
    if (this.isFeaturedNew) {
      return true;
    }
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const timeDiff = referenceDate.getTime() - new Date(this.releasedAt).getTime();
    return timeDiff >= 0 && timeDiff <= thirtyDaysInMs;
  }

  public hasSufficientStock(requestedQuantity: number): boolean {
    return this.stockQuantity >= requestedQuantity;
  }

  public decreaseStock(quantity: number): void {
    if (!this.hasSufficientStock(quantity)) {
      throw new Error(`Sản phẩm "${this.name}" không đủ số lượng trong kho.`);
    }
    this.stockQuantity -= quantity;
  }
}
