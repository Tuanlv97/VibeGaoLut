import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  Min,
} from 'class-validator';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { QuestionStatus } from '@domain/enums/question.enum';

export class CreateProductDto {
  @ApiProperty({ description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: 'Product Name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Custom URL Slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Price in VND' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Compare At Price in VND' })
  @IsOptional()
  @IsNumber()
  compareAtPrice?: number;

  @ApiProperty({ description: 'Stock Quantity' })
  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @ApiProperty({ description: 'Weight Unit (e.g. 500g, 1kg)' })
  @IsString()
  weightUnit: string;

  @ApiProperty({ description: 'Product Origin' })
  @IsString()
  origin: string;

  @ApiProperty({ description: 'Ingredients List' })
  @IsString()
  ingredients: string;

  @ApiProperty({ description: 'Nutrition Specification Info' })
  @IsString()
  nutritionInfo: string;

  @ApiProperty({ description: 'Product Description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Flag for New Arrival manual spotlight' })
  @IsOptional()
  @IsBoolean()
  isFeaturedNew?: boolean;

  @ApiPropertyOptional({ description: 'Image URLs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Product Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Custom URL Slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Price in VND' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ description: 'Compare At Price in VND' })
  @IsOptional()
  @IsNumber()
  compareAtPrice?: number;

  @ApiPropertyOptional({ description: 'Stock Quantity' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @ApiPropertyOptional({ description: 'Weight Unit' })
  @IsOptional()
  @IsString()
  weightUnit?: string;

  @ApiPropertyOptional({ description: 'Product Origin' })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiPropertyOptional({ description: 'Ingredients' })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiPropertyOptional({ description: 'Nutrition Info' })
  @IsOptional()
  @IsString()
  nutritionInfo?: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'New Arrival Flag' })
  @IsOptional()
  @IsBoolean()
  isFeaturedNew?: boolean;

  @ApiPropertyOptional({ description: 'Image URLs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'New Order Status', enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class CreateBlogPostDto {
  @ApiProperty({ description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: 'Post Title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Short Excerpt' })
  @IsString()
  excerpt: string;

  @ApiProperty({ description: 'Full HTML/Markdown Content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Cover Image URL' })
  @IsString()
  coverImage: string;

  @ApiProperty({ description: 'Author Name' })
  @IsString()
  authorName: string;

  @ApiPropertyOptional({ description: 'Estimated Reading Time (Minutes)' })
  @IsOptional()
  @IsNumber()
  readingTimeMinutes?: number;

  @ApiPropertyOptional({ description: 'Featured Article Flag' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Linked Product IDs for Content Commerce', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedProductIds?: string[];
}

export class UpdateBlogPostDto {
  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Post Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Short Excerpt' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ description: 'Content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Cover Image URL' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ description: 'Author Name' })
  @IsOptional()
  @IsString()
  authorName?: string;

  @ApiPropertyOptional({ description: 'Reading Time Minutes' })
  @IsOptional()
  @IsNumber()
  readingTimeMinutes?: number;

  @ApiPropertyOptional({ description: 'Featured Article Flag' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Linked Product IDs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedProductIds?: string[];
}

export class ModerateQuestionStatusDto {
  @ApiProperty({ description: 'New Question Status', enum: QuestionStatus })
  @IsEnum(QuestionStatus)
  status: QuestionStatus;
}

export class AnswerQuestionDto {
  @ApiProperty({ description: 'Official Answer Content' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'Responder Name' })
  @IsOptional()
  @IsString()
  responderName?: string;

  @ApiPropertyOptional({ description: 'Auto-approve Question Flag' })
  @IsOptional()
  @IsBoolean()
  approve?: boolean;
}

export class ImportInventoryDto {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity to import' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ description: 'Unit cost price in VND' })
  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @ApiPropertyOptional({ description: 'Supplier name' })
  @IsOptional()
  @IsString()
  supplier?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({ description: 'Name of staff/admin performing stock inward' })
  @IsOptional()
  @IsString()
  createdByName?: string;
}

