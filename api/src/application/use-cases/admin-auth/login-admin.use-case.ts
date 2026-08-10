import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAdminUserRepository } from '@domain/repositories/admin-user.repository.interface';
import { LoginDto } from '../../dto/admin-auth.dto';
import { AdminRole } from '@domain/enums/admin-role.enum';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: AdminRole;
  };
}

@Injectable()
export class LoginAdminUseCase {
  constructor(
    private readonly adminUserRepository: IAdminUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.adminUserRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản đã bị khóa. Vui lòng liên hệ Super Admin');
    }

    const isValidPassword = await user.validatePassword(dto.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
