import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdminRole } from '@domain/enums/admin-role.enum';

export class LoginDto {
  @ApiProperty({ example: 'admin@greenpantry.vn' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email!: string;

  @ApiProperty({ example: 'Admin@123456' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password!: string;
}

export class CreateAdminUserDto {
  @ApiProperty({ example: 'staff@greenpantry.vn' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email!: string;

  @ApiProperty({ example: 'Staff@123456' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password!: string;

  @ApiProperty({ example: 'Nguyễn Văn Quản Lý' })
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName!: string;

  @ApiProperty({ enum: AdminRole, example: AdminRole.STORE_MANAGER })
  @IsEnum(AdminRole, { message: 'Chức vụ không hợp lệ' })
  role!: AdminRole;
}

export class UpdateAdminUserDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn Quản Lý' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ enum: AdminRole, example: AdminRole.STORE_MANAGER })
  @IsOptional()
  @IsEnum(AdminRole, { message: 'Chức vụ không hợp lệ' })
  role?: AdminRole;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'NewPass@123456' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
  password?: string;
}
