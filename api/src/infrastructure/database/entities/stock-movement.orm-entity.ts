import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('stock_movements')
export class StockMovementOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'INWARD' | 'OUTWARD';

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitCost: number;

  @Column({ default: '' })
  supplier: string;

  @Column({ type: 'text', default: '' })
  note: string;

  @Column({ name: 'created_by_name', default: 'System Admin' })
  createdByName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
