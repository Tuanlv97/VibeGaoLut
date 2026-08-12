import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerOrmEntity } from './customer.orm-entity';

@Entity('customer_addresses')
export class CustomerAddressOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'varchar', length: 255 })
  recipientName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  province: string;

  @Column({ type: 'varchar', length: 100 })
  district: string;

  @Column({ type: 'varchar', length: 100 })
  ward: string;

  @Column({ type: 'text' })
  addressDetail: string;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => CustomerOrmEntity, (customer) => customer.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerOrmEntity;
}
