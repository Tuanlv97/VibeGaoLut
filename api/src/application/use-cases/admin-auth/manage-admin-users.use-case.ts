import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { IAdminUserRepository } from '@domain/repositories/admin-user.repository.interface';
import { AdminUser } from '@domain/entities/admin-user.entity';
import { CreateAdminUserDto, UpdateAdminUserDto } from '../../dto/admin-auth.dto';

@Injectable()
export class ManageAdminUsersUseCase {
  constructor(private readonly adminUserRepository: IAdminUserRepository) {}

  async getAllUsers(): Promise<AdminUser[]> {
    return this.adminUserRepository.findAll();
  }

  async createUser(dto: CreateAdminUserDto): Promise<AdminUser> {
    const existing = await this.adminUserRepository.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email này đã tồn tại trong hệ thống');
    }

    const passwordHash = await AdminUser.hashPassword(dto.password);
    const user = new AdminUser(
      `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      dto.email.toLowerCase(),
      passwordHash,
      dto.fullName,
      dto.role,
      true,
      new Date(),
      new Date(),
    );

    return this.adminUserRepository.save(user);
  }

  async updateUser(id: string, dto: UpdateAdminUserDto): Promise<AdminUser> {
    const user = await this.adminUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }

    user.updateDetails(dto.fullName, dto.role, dto.isActive);

    if (dto.password) {
      await user.setPassword(dto.password);
    }

    return this.adminUserRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.adminUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }
    return this.adminUserRepository.delete(id);
  }
}
