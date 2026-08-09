import { Controller, Post, Body, BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { CreateReviewUseCase } from '@application/use-cases/commerce/create-review.use-case';
import { CreateReviewDto } from '../dtos/create-review.dto';

@ApiTags('Commerce')
@Controller('reviews')
@UseGuards(ThrottlerGuard)
export class ReviewController {
  constructor(@Inject('CreateReviewUseCase') private readonly createReviewUseCase: CreateReviewUseCase) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // Max 3 review submissions per minute
  @ApiOperation({ summary: 'Guest Verified Review — Gửi đánh giá cho sản phẩm đã mua' })
  @ApiResponse({ status: 201, description: 'Đánh giá được ghi nhận với trạng thái PENDING chờ kiểm duyệt' })
  @ApiResponse({ status: 400, description: 'Lỗi chưa mua hàng, chưa giao DELIVERED hoặc sản phẩm không có trong đơn' })
  async createReview(@Body() dto: CreateReviewDto) {
    try {
      return await this.createReviewUseCase.execute(dto);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
