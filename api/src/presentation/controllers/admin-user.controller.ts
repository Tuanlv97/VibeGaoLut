import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '@infrastructure/auth/roles.guard';
import { Roles } from '@infrastructure/auth/roles.decorator';
import { AdminRole } from '@domain/enums/admin-role.enum';
import { ManageAdminUsersUseCase } from '@application/use-cases/admin-auth/manage-admin-users.use-case';
import { CreateAdminUserDto, UpdateAdminUserDto } from '@application/dto/admin-auth.dto';

@ApiTags('Admin Users (RBAC)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AdminRole.SUPER_ADMIN)
@Controller('admin/users')
export class AdminUserController {
  constructor(
    @Inject('ManageAdminUsersUseCase')
    private readonly manageAdminUsersUseCase: ManageAdminUsersUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tài khoản Admin (Chỉ Super Admin)' })
  async getAllUsers() {
    return this.manageAdminUsersUseCase.getAllUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo tài khoản Admin / Nhân viên mới (Chỉ Super Admin)' })
  async createUser(@Body() dto: CreateAdminUserDto) {
    return this.manageAdminUsersUseCase.createUser(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật quyền hạn hoặc trạng thái tài khoản Admin (Chỉ Super Admin)' })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateAdminUserDto) {
    return this.manageAdminUsersUseCase.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tài khoản Admin (Chỉ Super Admin)' })
  async deleteUser(@Param('id') id: string) {
    return this.manageAdminUsersUseCase.deleteUser(id);
  }
}
