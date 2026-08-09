import { Controller, Post, Get, Body, Query, NotFoundException, BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { CreateOrderUseCase } from '@application/use-cases/commerce/create-order.use-case';
import { TrackOrderUseCase } from '@application/use-cases/commerce/track-order.use-case';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { TrackOrderQueryDto } from '../dtos/track-order.dto';

@ApiTags('Commerce')
@Controller('orders')
@UseGuards(ThrottlerGuard)
export class OrderController {
  constructor(
    @Inject('CreateOrderUseCase') private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('TrackOrderUseCase') private readonly trackOrderUseCase: TrackOrderUseCase,
  ) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Max 5 checkout requests per minute
  @ApiOperation({ summary: 'Guest Checkout tạo đơn hàng mới' })
  @ApiResponse({ status: 201, description: 'Đơn hàng tạo thành công (Tính toán lại giá 100% từ backend)' })
  @ApiResponse({ status: 400, description: 'Lỗi validate dữ liệu hoặc hết tồn kho' })
  async createOrder(@Body() dto: CreateOrderDto) {
    try {
      return await this.createOrderUseCase.execute(dto);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('track')
  @ApiOperation({ summary: 'Theo dõi đơn hàng bằng Mã đơn + Số điện thoại' })
  @ApiResponse({ status: 200, description: 'Thông tin đơn hàng' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  async trackOrder(@Query() query: TrackOrderQueryDto) {
    const order = await this.trackOrderUseCase.execute({
      orderNumber: query.orderNumber,
      customerPhone: query.customerPhone,
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng tương ứng với Mã đơn và Số điện thoại đã nhập.');
    }
    return order;
  }
}
