import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  orderId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: OrderOrmEntity;
}
