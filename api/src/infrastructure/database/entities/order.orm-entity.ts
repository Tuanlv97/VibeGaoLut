import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  customerPhone: string;

  @Column({ type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'varchar', length: 100 })
  province: string;

  @Column({ type: 'varchar', length: 100 })
  district: string;

  @Column({ type: 'varchar', length: 100 })
  ward: string;

  @Column({ type: 'text' })
  addressDetail: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  shippingFee: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 50, default: 'COD' })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  customerId: string | null;

  @Column({ type: 'int', default: 0 })
  pointsUsed: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  pointsDiscountAmount: number;

  @Column({ type: 'int', default: 0 })
  pointsEarned: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, { cascade: true, eager: true })
  items: OrderItemOrmEntity[];
}
