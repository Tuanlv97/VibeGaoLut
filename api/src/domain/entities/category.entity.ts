export class Category {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public imageUrl?: string,
    public isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
  ) {}
}
