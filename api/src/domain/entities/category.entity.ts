export class Category {
  public productCount: number = 0;

  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public imageUrl?: string,
    public isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
    productCount: number = 0,
  ) {
    this.productCount = productCount;
  }
}
