import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAdminUserRepository } from '@domain/repositories/admin-user.repository.interface';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  fullName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IAdminUserRepository')
    private readonly adminUserRepository: IAdminUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'greenpantry_secret_jwt_key_2026',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.adminUserRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Tài khoản không tồn tại hoặc đã bị vô hiệu hóa');
    }
    return {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }
}
