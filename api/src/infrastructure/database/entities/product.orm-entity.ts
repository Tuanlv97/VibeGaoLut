import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class ProductOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  compareAtPrice: number | null;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @Column({ type: 'varchar', length: 50 })
  weightUnit: string;

  @Column({ type: 'varchar', length: 255 })
  origin: string;

  @Column({ type: 'text' })
  ingredients: string;

  @Column({ type: 'text' })
  nutritionInfo: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  isFeaturedNew: boolean;

  @Column({ type: 'timestamp' })
  releasedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'jsonb', default: [] })
  images: string[];
}
