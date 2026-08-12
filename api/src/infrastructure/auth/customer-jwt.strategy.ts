import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';

export interface CustomerJwtPayload {
  sub: string;
  email: string;
  phone: string;
  fullName: string;
  role: string;
}

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'greenpantry_secret_jwt_key_2026',
    });
  }

  async validate(payload: CustomerJwtPayload) {
    if (payload.role !== 'CUSTOMER') {
      throw new UnauthorizedException('Quyền truy cập không hợp lệ.');
    }
    const customer = await this.customerRepository.findById(payload.sub);
    if (!customer || !customer.isActive) {
      throw new UnauthorizedException('Tài khoản khách hàng không tồn tại hoặc đã bị khóa.');
    }
    return {
      customerId: customer.id,
      email: customer.email,
      phone: customer.phone,
      fullName: customer.fullName,
      loyaltyPoints: customer.loyaltyPoints,
    };
  }
}
