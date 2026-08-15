import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IOrderRepository, IORDER_REPOSITORY } from '@domain/repositories/order.repository.interface';
import { ICustomerAddressRepository, ICUSTOMER_ADDRESS_REPOSITORY } from '@domain/repositories/customer-address.repository.interface';
import { CustomerAddress } from '@domain/entities/customer-address.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';

export interface UpdateOrderAddressInput {
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  province: string;
  district?: string;
  ward: string;
  addressDetail: string;
  updateDefaultAddress?: boolean;
}

@Injectable()
export class UpdateOrderAddressUseCase {
  constructor(
    @Inject(IORDER_REPOSITORY)
    private readonly orderRepo: IOrderRepository,
    @Inject(ICUSTOMER_ADDRESS_REPOSITORY)
    private readonly addressRepo: ICustomerAddressRepository,
  ) {}

  async execute(input: UpdateOrderAddressInput) {
    const order = await this.orderRepo.findById(input.orderId);
    if (!order || order.customerId !== input.customerId) {
      throw new NotFoundException('Không tìm thấy đơn hàng tương ứng.');
    }

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PROCESSING) {
      throw new BadRequestException('Chỉ có thể thay đổi địa chỉ cho đơn hàng đang chờ duyệt hoặc đang xử lý.');
    }

    order.customerName = input.customerName.trim();
    order.customerPhone = input.customerPhone.trim();
    order.province = input.province.trim();
    order.district = input.district ? input.district.trim() : '';
    order.ward = input.ward.trim();
    order.addressDetail = input.addressDetail.trim();

    const updatedOrder = await this.orderRepo.save(order);

    if (input.updateDefaultAddress) {
      try {
        await this.addressRepo.unsetOthersDefault(input.customerId);
        const newAddress = new CustomerAddress(
          randomUUID(),
          input.customerId,
          input.customerName.trim(),
          input.customerPhone.trim(),
          input.province.trim(),
          input.district ? input.district.trim() : '',
          input.ward.trim(),
          input.addressDetail.trim(),
          true,
          new Date(),
        );
        await this.addressRepo.save(newAddress);
      } catch {
        // Ignore failure if address sync fails
      }
    }

    return updatedOrder;
  }
}
