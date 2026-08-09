export class BlogCategory {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}

export class BlogPost {
  constructor(
    public readonly id: string,
    public categoryId: string,
    public title: string,
    public slug: string,
    public excerpt: string,
    public content: string,
    public coverImage: string,
    public authorName: string,
    public readingTimeMinutes: number,
    public isFeatured: boolean = false,
    public publishedAt: Date = new Date(),
    public readonly createdAt: Date = new Date(),
    public relatedProductIds: string[] = [],
  ) {}
}
