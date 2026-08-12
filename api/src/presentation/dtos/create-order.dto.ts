import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Matches, IsArray, ValidateNested, ArrayMinSize, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'prod_gao_lut_st25', description: 'Product UUID' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Customer full name' })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ example: '0912345678', description: 'Vietnamese phone number' })
  @IsNotEmpty()
  @Matches(/^0[35789]\d{8}$/, { message: 'Số điện thoại không đúng định dạng Việt Nam.' })
  customerPhone: string;

  @ApiProperty({ example: 'ana@example.com', description: 'Customer email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  customerEmail: string;

  @ApiProperty({ example: 'Hà Nội', description: 'Province / City' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Cầu Giấy', description: 'District' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'Dịch Vọng', description: 'Ward' })
  @IsNotEmpty()
  @IsString()
  ward: string;

  @ApiProperty({ example: 'Số 10 Phạm Hùng', description: 'Detailed street address' })
  @IsNotEmpty()
  @IsString()
  addressDetail: string;

  @ApiProperty({ type: [CreateOrderItemDto], description: 'List of order items' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Đơn hàng phải chứa ít nhất 1 sản phẩm.' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ required: false, description: 'Customer UUID if logged in' })
  customerId?: string;

  @ApiProperty({ required: false, description: 'Whether customer explicitly opted to redeem points' })
  usePoints?: boolean;

  @ApiProperty({ required: false, description: 'Amount of points to redeem' })
  pointsToUse?: number;
}
