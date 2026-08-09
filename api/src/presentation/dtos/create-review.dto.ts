import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsInt, Min, Max, IsOptional, IsArray } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'GP-883920', description: 'Order number for verification' })
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @ApiProperty({ example: '0912345678', description: 'Customer phone number for verification' })
  @IsNotEmpty()
  @Matches(/^0[35789]\d{8}$/, { message: 'Số điện thoại không đúng định dạng Việt Nam.' })
  customerPhone: string;

  @ApiProperty({ example: 'prod_gao_lut_st25', description: 'Product ID' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 5, description: 'Rating 1 to 5 stars' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Gạo rất dẻo và thơm ngon!', description: 'Review comment' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiPropertyOptional({ example: ['/img/review1.jpg'], description: 'Review image URLs' })
  @IsOptional()
  @IsArray()
  images?: string[];
}
