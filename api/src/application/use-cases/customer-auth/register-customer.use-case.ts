import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Customer } from '@domain/entities/customer.entity';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { IOrderRepository, IORDER_REPOSITORY } from '@domain/repositories/order.repository.interface';

export interface RegisterCustomerDto {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

@Injectable()
export class RegisterCustomerUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(IORDER_REPOSITORY)
    private readonly orderRepo: IOrderRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterCustomerDto) {
    const email = dto.email.trim().toLowerCase();
    const phone = dto.phone.trim();

    if (!dto.fullName || !phone || !email || !dto.password) {
      throw new BadRequestException('Vui lòng điền đầy đủ thông tin đăng ký.');
    }

    const existingEmail = await this.customerRepo.findByEmail(email);
    if (existingEmail) {
      throw new ConflictException('Email này đã được sử dụng.');
    }

    const existingPhone = await this.customerRepo.findByPhone(phone);
    if (existingPhone) {
      throw new ConflictException('Số điện thoại này đã được sử dụng.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const customer = new Customer(
      randomUUID(),
      dto.fullName.trim(),
      phone,
      email,
      passwordHash,
      0,
      0,
      true,
      new Date(),
      new Date(),
      [],
    );

    const saved = await this.customerRepo.save(customer);

    // Auto-link existing guest orders with matching phone number
    try {
      const existingOrders = await this.orderRepo.findByPhone(phone);
      for (const order of existingOrders) {
        if (!order.customerId) {
          order.customerId = saved.id;
          await this.orderRepo.save(order);
        }
      }
    } catch {}

    const payload = {
      sub: saved.id,
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      role: 'CUSTOMER',
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      customer: {
        id: saved.id,
        fullName: saved.fullName,
        email: saved.email,
        phone: saved.phone,
        loyaltyPoints: saved.loyaltyPoints,
        goldBalance: saved.goldBalance || 0,
      },
    };
  }
}
