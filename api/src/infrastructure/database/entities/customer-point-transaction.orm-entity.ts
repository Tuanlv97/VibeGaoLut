import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerOrmEntity } from './customer.orm-entity';
import { OrderOrmEntity } from './order.orm-entity';

@Entity('customer_point_transactions')
export class CustomerPointTransactionOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid', nullable: true })
  orderId: string | null;

  @Column({ type: 'varchar', length: 50 })
  transactionType: string;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'int' })
  balanceAfter: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => CustomerOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerOrmEntity;

  @ManyToOne(() => OrderOrmEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: OrderOrmEntity | null;
}
