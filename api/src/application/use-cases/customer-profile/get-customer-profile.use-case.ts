import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICustomerRepository, ICUSTOMER_REPOSITORY } from '@domain/repositories/customer.repository.interface';
import { ICustomerAddressRepository, ICUSTOMER_ADDRESS_REPOSITORY } from '@domain/repositories/customer-address.repository.interface';

@Injectable()
export class GetCustomerProfileUseCase {
  constructor(
    @Inject(ICUSTOMER_REPOSITORY)
    private readonly customerRepo: ICustomerRepository,
    @Inject(ICUSTOMER_ADDRESS_REPOSITORY)
    private readonly addressRepo: ICustomerAddressRepository,
  ) {}

  async execute(customerId: string) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy tài khoản khách hàng.');
    }

    const addresses = await this.addressRepo.findByCustomerId(customerId);

    return {
      id: customer.id,
      fullName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      loyaltyPoints: customer.loyaltyPoints,
      goldBalance: customer.goldBalance || 0,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      addresses: addresses.map((a) => ({
        id: a.id,
        recipientName: a.recipientName,
        phone: a.phone,
        province: a.province,
        district: a.district,
        ward: a.ward,
        addressDetail: a.addressDetail,
        isDefault: a.isDefault,
      })),
    };
  }
}
