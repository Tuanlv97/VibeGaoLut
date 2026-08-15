import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerJwtAuthGuard } from '@infrastructure/auth/customer-jwt-auth.guard';
import { GetCustomerProfileUseCase } from '@application/use-cases/customer-profile/get-customer-profile.use-case';
import { ManageCustomerAddressesUseCase, CreateAddressDto, UpdateAddressDto } from '@application/use-cases/customer-profile/manage-customer-addresses.use-case';
import { GetCustomerOrdersUseCase } from '@application/use-cases/customer-profile/get-customer-orders.use-case';
import { GetCustomerPointsHistoryUseCase } from '@application/use-cases/customer-profile/get-customer-points-history.use-case';
import { UpdateOrderAddressUseCase } from '@application/use-cases/customer-profile/update-order-address.use-case';
import { UpdateOrderAddressDto } from '../dtos/update-order-address.dto';

@ApiTags('Customer Profile')
@ApiBearerAuth()
@UseGuards(CustomerJwtAuthGuard)
@Controller('customer')
export class CustomerProfileController {
  constructor(
    private readonly getProfileUseCase: GetCustomerProfileUseCase,
    private readonly manageAddressesUseCase: ManageCustomerAddressesUseCase,
    private readonly getOrdersUseCase: GetCustomerOrdersUseCase,
    private readonly getPointsHistoryUseCase: GetCustomerPointsHistoryUseCase,
    private readonly updateOrderAddressUseCase: UpdateOrderAddressUseCase,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân khách hàng' })
  async getProfile(@Request() req: any) {
    return this.getProfileUseCase.execute(req.user.customerId);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Thêm địa chỉ nhận hàng mới' })
  async createAddress(@Request() req: any, @Body() dto: CreateAddressDto) {
    return this.manageAddressesUseCase.create(req.user.customerId, dto);
  }

  @Put('addresses/:id')
  @ApiOperation({ summary: 'Cập nhật địa chỉ nhận hàng' })
  async updateAddress(
    @Request() req: any,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.manageAddressesUseCase.update(req.user.customerId, addressId, dto);
  }

  @Delete('addresses/:id')
  @ApiOperation({ summary: 'Xóa địa chỉ nhận hàng' })
  async deleteAddress(@Request() req: any, @Param('id') addressId: string) {
    await this.manageAddressesUseCase.delete(req.user.customerId, addressId);
    return { success: true, message: 'Đã xóa địa chỉ thành công.' };
  }

  @Get('orders')
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của khách hàng' })
  async getOrders(@Request() req: any) {
    return this.getOrdersUseCase.execute(req.user.customerId);
  }

  @Put('orders/:id/address')
  @ApiOperation({ summary: 'Cập nhật địa chỉ nhận hàng của đơn hàng (PENDING / PROCESSING)' })
  async updateOrderAddress(
    @Request() req: any,
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderAddressDto,
  ) {
    return this.updateOrderAddressUseCase.execute({
      orderId,
      customerId: req.user.customerId,
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      province: dto.province,
      district: dto.district,
      ward: dto.ward,
      addressDetail: dto.addressDetail,
      updateDefaultAddress: dto.updateDefaultAddress,
    });
  }

  @Get('points/history')
  @ApiOperation({ summary: 'Xem điểm tích lũy và lịch sử tích/đổi điểm' })
  async getPointsHistory(@Request() req: any) {
    return this.getPointsHistoryUseCase.execute(req.user.customerId);
  }
}
