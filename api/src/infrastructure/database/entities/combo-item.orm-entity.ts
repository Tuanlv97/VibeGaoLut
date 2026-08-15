import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ComboOrmEntity } from './combo.orm-entity';
import { ProductOrmEntity } from './product.orm-entity';

@Entity('combo_items')
export class ComboItemOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  comboId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => ComboOrmEntity, (combo) => combo.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'combo_id' })
  combo: ComboOrmEntity;

  @ManyToOne(() => ProductOrmEntity, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductOrmEntity;
}
