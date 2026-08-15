import { Controller, Post, Body, BadRequestException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { QueryChatbotUseCase } from '../../application/use-cases/chatbot/query-chatbot.use-case';

export class ChatbotQueryDto {
  @ApiProperty({ description: 'Nội dung câu hỏi của người dùng', example: 'Tác dụng gạo lứt đỏ ST25 là gì?' })
  @IsNotEmpty({ message: 'Vui lòng nhập nội dung câu hỏi' })
  @IsString()
  message: string;
}

@ApiTags('Chatbot AI Assistant')
@Controller('chatbot')
export class ChatbotController {
  constructor(
    @Inject('QueryChatbotUseCase') private readonly queryChatbotUseCase: QueryChatbotUseCase,
  ) {}

  @Post('query')
  @ApiOperation({ summary: 'Truy vấn Chatbot AI Vector Search RAG (Trả lời ngữ nghĩa + Gợi ý sản phẩm & bài viết)' })
  @ApiResponse({ status: 200, description: 'Phản hồi thành công từ Chatbot AI' })
  @ApiResponse({ status: 400, description: 'Lỗi validate dữ liệu' })
  async queryChatbot(@Body() dto: ChatbotQueryDto) {
    try {
      return await this.queryChatbotUseCase.execute(dto);
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Lỗi khi xử lý truy vấn Chatbot AI');
    }
  }
}
