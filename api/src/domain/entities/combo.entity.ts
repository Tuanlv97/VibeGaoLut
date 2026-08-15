export type ComboType = 'WEIGHT_LOSS' | 'WEIGHT_GAIN' | 'HEALTH' | 'OFFICE' | 'FAMILY';

export class ComboItem {
  constructor(
    public readonly id: string,
    public readonly comboId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public productName?: string,
    public productImage?: string,
    public productSlug?: string,
  ) {}
}

export class Combo {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public comboType: ComboType,
    public shortDescription: string,
    public fullDescription: string,
    public originalPrice: number,
    public comboPrice: number,
    public savingsAmount: number,
    public bannerUrl: string,
    public mealPlanJson: any,
    public isActive: boolean = true,
    public items: ComboItem[] = [],
    public readonly createdAt: Date = new Date(),
  ) {}
}
