import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('administrative_units')
export class AdministrativeUnitOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20, default: 'WARD' })
  level: string; // 'PROVINCE' | 'WARD'

  @Column({ type: 'varchar', length: 50, nullable: true })
  parentId: string | null;

  @ManyToOne(() => AdministrativeUnitOrmEntity, (unit) => unit.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent?: AdministrativeUnitOrmEntity | null;

  @OneToMany(() => AdministrativeUnitOrmEntity, (unit) => unit.parent)
  children?: AdministrativeUnitOrmEntity[];
}
