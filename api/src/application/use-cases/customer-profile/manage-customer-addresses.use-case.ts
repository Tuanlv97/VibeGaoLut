import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CustomerAddress } from '@domain/entities/customer-address.entity';
import { ICustomerAddressRepository, ICUSTOMER_ADDRESS_REPOSITORY } from '@domain/repositories/customer-address.repository.interface';

export interface CreateAddressDto {
  recipientName: string;
  phone: string;
  province: string;
  district?: string;
  ward: string;
  addressDetail: string;
  isDefault?: boolean;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}

@Injectable()
export class ManageCustomerAddressesUseCase {
  constructor(
    @Inject(ICUSTOMER_ADDRESS_REPOSITORY)
    private readonly addressRepo: ICustomerAddressRepository,
  ) {}

  async create(customerId: string, dto: CreateAddressDto): Promise<CustomerAddress> {
    if (!dto.recipientName || !dto.phone || !dto.province || !dto.ward || !dto.addressDetail) {
      throw new BadRequestException('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng.');
    }

    const existingList = await this.addressRepo.findByCustomerId(customerId);
    const isFirstAddress = existingList.length === 0;
    const shouldBeDefault = dto.isDefault || isFirstAddress;

    if (shouldBeDefault) {
      await this.addressRepo.unsetOthersDefault(customerId);
    }

    const newAddress = new CustomerAddress(
      randomUUID(),
      customerId,
      dto.recipientName.trim(),
      dto.phone.trim(),
      dto.province.trim(),
      dto.district ? dto.district.trim() : '',
      dto.ward.trim(),
      dto.addressDetail.trim(),
      shouldBeDefault,
      new Date(),
    );

    return this.addressRepo.save(newAddress);
  }

  async update(customerId: string, addressId: string, dto: UpdateAddressDto): Promise<CustomerAddress> {
    const address = await this.addressRepo.findById(addressId);
    if (!address || address.customerId !== customerId) {
      throw new NotFoundException('Không tìm thấy địa chỉ.');
    }

    if (dto.recipientName !== undefined) address.recipientName = dto.recipientName.trim();
    if (dto.phone !== undefined) address.phone = dto.phone.trim();
    if (dto.province !== undefined) address.province = dto.province.trim();
    if (dto.district !== undefined) address.district = dto.district.trim();
    if (dto.ward !== undefined) address.ward = dto.ward.trim();
    if (dto.addressDetail !== undefined) address.addressDetail = dto.addressDetail.trim();

    if (dto.isDefault) {
      address.isDefault = true;
      await this.addressRepo.unsetOthersDefault(customerId, addressId);
    }

    return this.addressRepo.save(address);
  }

  async delete(customerId: string, addressId: string): Promise<void> {
    const address = await this.addressRepo.findById(addressId);
    if (!address || address.customerId !== customerId) {
      throw new NotFoundException('Không tìm thấy địa chỉ.');
    }

    await this.addressRepo.delete(addressId);

    if (address.isDefault) {
      const remaining = await this.addressRepo.findByCustomerId(customerId);
      if (remaining.length > 0) {
        remaining[0].isDefault = true;
        await this.addressRepo.save(remaining[0]);
      }
    }
  }
}
