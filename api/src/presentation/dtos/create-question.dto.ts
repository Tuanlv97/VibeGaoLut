import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { QuestionType } from '@domain/enums/question.enum';

export class CreateQuestionDto {
  @ApiProperty({ example: 'Tran Thi B', description: 'Author full name' })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({ example: 'b@example.com', description: 'Author email address' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  authorEmail: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.COOKING, description: 'Question category' })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty({ example: 'Nấu gạo lứt bao nhiêu phút?', description: 'Question content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'prod_gao_lut_st25', description: 'Related product ID (optional)' })
  @IsOptional()
  @IsString()
  productId?: string;
}
