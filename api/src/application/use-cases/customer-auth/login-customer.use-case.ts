import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';

export interface LoginCustomerDto {
  identifier: string; // Email or Phone
  password: string;
}

@Injectable()
export class LoginCustomerUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginCustomerDto) {
    const identifier = dto.identifier.trim();
    if (!identifier || !dto.password) {
      throw new UnauthorizedException('Vui lòng nhập email/sĐT và mật khẩu.');
    }

    let customer = await this.customerRepo.findByEmail(identifier.toLowerCase());
    if (!customer) {
      customer = await this.customerRepo.findByPhone(identifier);
    }

    if (!customer || !customer.isActive) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác hoặc tài khoản bị khóa.');
    }

    const isMatch = await bcrypt.compare(dto.password, customer.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác.');
    }

    const payload = {
      sub: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      role: 'CUSTOMER',
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      customer: {
        id: customer.id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        loyaltyPoints: customer.loyaltyPoints,
        goldBalance: customer.goldBalance || 0,
      },
    };
  }
}
