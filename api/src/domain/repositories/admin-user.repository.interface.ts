import { AdminUser } from '../entities/admin-user.entity';

export interface IAdminUserRepository {
  findById(id: string): Promise<AdminUser | null>;
  findByEmail(email: string): Promise<AdminUser | null>;
  findAll(): Promise<AdminUser[]>;
  save(user: AdminUser): Promise<AdminUser>;
  delete(id: string): Promise<boolean>;
}
