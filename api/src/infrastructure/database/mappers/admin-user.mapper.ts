import { AdminUser } from '@domain/entities/admin-user.entity';
import { AdminUserOrmEntity } from '../entities/admin-user.orm-entity';

export class AdminUserMapper {
  static toDomain(orm: AdminUserOrmEntity): AdminUser {
    return new AdminUser(
      orm.id,
      orm.email,
      orm.passwordHash,
      orm.fullName,
      orm.role,
      orm.isActive,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: AdminUser): AdminUserOrmEntity {
    const orm = new AdminUserOrmEntity();
    orm.id = domain.id;
    orm.email = domain.email;
    orm.passwordHash = domain.passwordHash;
    orm.fullName = domain.fullName;
    orm.role = domain.role;
    orm.isActive = domain.isActive;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
