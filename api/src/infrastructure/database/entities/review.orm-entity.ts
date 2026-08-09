import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reviews')
export class ReviewOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'uuid' })
  orderId: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'jsonb', default: [] })
  images: string[];

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
