import { Controller, Get, Post, Body, Query, BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { GetQuestionsUseCase } from '@application/use-cases/community/get-questions.use-case';
import { CreateQuestionUseCase } from '@application/use-cases/community/create-question.use-case';
import { CreateQuestionDto } from '../dtos/create-question.dto';

export class GetQuestionsQueryDto {
  @ApiPropertyOptional({ description: 'Filter by Product ID' })
  @IsOptional()
  @IsString()
  productId?: string;
}

@ApiTags('Community')
@Controller('questions')
@UseGuards(ThrottlerGuard)
export class QuestionController {
  constructor(
    @Inject('GetQuestionsUseCase') private readonly getQuestionsUseCase: GetQuestionsUseCase,
    @Inject('CreateQuestionUseCase') private readonly createQuestionUseCase: CreateQuestionUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi Q&A cộng đồng (Chỉ trả về các câu hỏi đã APPROVED)' })
  @ApiResponse({ status: 200, description: 'Danh sách câu hỏi đã duyệt' })
  async getQuestions(@Query() query: GetQuestionsQueryDto) {
    return this.getQuestionsUseCase.execute(query);
  }

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Max 5 question submissions per minute
  @ApiOperation({ summary: 'Guest đặt câu hỏi mới (Tự động đính cờ PENDING chờ kiểm duyệt)' })
  @ApiResponse({ status: 201, description: 'Câu hỏi đã gửi và ở trạng thái PENDING' })
  @ApiResponse({ status: 400, description: 'Lỗi validate dữ liệu' })
  async createQuestion(@Body() dto: CreateQuestionDto) {
    try {
      return await this.createQuestionUseCase.execute(dto);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
