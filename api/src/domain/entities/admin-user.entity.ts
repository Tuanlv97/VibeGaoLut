import { AdminRole } from '../enums/admin-role.enum';
import * as bcrypt from 'bcryptjs';

export class AdminUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public passwordHash: string,
    public fullName: string,
    public role: AdminRole,
    public isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  updateDetails(fullName?: string, role?: AdminRole, isActive?: boolean): void {
    if (fullName) this.fullName = fullName;
    if (role) this.role = role;
    if (isActive !== undefined) this.isActive = isActive;
    this.updatedAt = new Date();
  }

  async setPassword(newPassword: string): Promise<void> {
    this.passwordHash = await AdminUser.hashPassword(newPassword);
    this.updatedAt = new Date();
  }
}
