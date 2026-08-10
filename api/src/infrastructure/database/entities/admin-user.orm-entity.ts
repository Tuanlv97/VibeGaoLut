import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AdminRole } from '@domain/enums/admin-role.enum';

@Entity('admin_users')
export class AdminUserOrmEntity {
  @PrimaryColumn('varchar', { length: 64 })
  id!: string;

  @Column('varchar', { length: 150, unique: true })
  email!: string;

  @Column('varchar', { length: 255 })
  passwordHash!: string;

  @Column('varchar', { length: 150 })
  fullName!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: AdminRole.STORE_MANAGER,
  })
  role!: AdminRole;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
