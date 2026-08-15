import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ComboItemOrmEntity } from './combo-item.orm-entity';

@Entity('combos')
export class ComboOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 50 })
  comboType: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  comboPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  savingsAmount: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bannerUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  mealPlanJson: any;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ComboItemOrmEntity, (item) => item.combo, { cascade: true, eager: true })
  items: ComboItemOrmEntity[];
}
