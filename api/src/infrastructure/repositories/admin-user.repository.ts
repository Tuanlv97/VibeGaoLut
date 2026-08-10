import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAdminUserRepository } from '@domain/repositories/admin-user.repository.interface';
import { AdminUser } from '@domain/entities/admin-user.entity';
import { AdminUserOrmEntity } from '../database/entities/admin-user.orm-entity';
import { AdminUserMapper } from '../database/mappers/admin-user.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class AdminUserRepository implements IAdminUserRepository, OnModuleInit {
  private inMemoryUsers: AdminUser[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(AdminUserOrmEntity)
    private readonly typeOrmRepo?: Repository<AdminUserOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryUsers = [...seederService.getAdminUsers()];
    }
  }

  async onModuleInit() {
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const seedUsers = this.seederService.getAdminUsers();
          for (const u of seedUsers) {
            await this.typeOrmRepo.save(AdminUserMapper.toOrm(u));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async findById(id: string): Promise<AdminUser | null> {
    if (this.typeOrmRepo) {
      const found = await this.typeOrmRepo.findOne({ where: { id } });
      if (found) {
        return AdminUserMapper.toDomain(found);
      }
    }
    const found = this.inMemoryUsers.find((u) => u.id === id);
    return found || null;
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    if (this.typeOrmRepo) {
      const found = await this.typeOrmRepo.findOne({ where: { email: email.toLowerCase() } });
      if (found) {
        return AdminUserMapper.toDomain(found);
      }
    }
    const found = this.inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found || null;
  }

  async findAll(): Promise<AdminUser[]> {
    if (this.typeOrmRepo) {
      const list = await this.typeOrmRepo.find({ order: { createdAt: 'DESC' } });
      if (list.length > 0) {
        return list.map(AdminUserMapper.toDomain);
      }
    }
    return [...this.inMemoryUsers];
  }

  async save(user: AdminUser): Promise<AdminUser> {
    if (this.typeOrmRepo) {
      const orm = AdminUserMapper.toOrm(user);
      const saved = await this.typeOrmRepo.save(orm);
      return AdminUserMapper.toDomain(saved);
    }
    const index = this.inMemoryUsers.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      this.inMemoryUsers[index] = user;
    } else {
      this.inMemoryUsers.push(user);
    }
    return user;
  }

  async delete(id: string): Promise<boolean> {
    if (this.typeOrmRepo) {
      const res = await this.typeOrmRepo.delete(id);
      return (res.affected || 0) > 0;
    }
    const initialLen = this.inMemoryUsers.length;
    this.inMemoryUsers = this.inMemoryUsers.filter((u) => u.id !== id);
    return this.inMemoryUsers.length < initialLen;
  }
}
