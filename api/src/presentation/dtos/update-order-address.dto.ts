import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsOptional, IsBoolean } from 'class-validator';

export class UpdateOrderAddressDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Customer full name' })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ example: '0912345678', description: 'Vietnamese phone number' })
  @IsNotEmpty()
  @Matches(/^0[35789]\d{8}$/, { message: 'Số điện thoại không đúng định dạng Việt Nam.' })
  customerPhone: string;

  @ApiProperty({ example: 'Hà Nội', description: 'Province / City' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Cầu Giấy', required: false, description: 'District (Optional)' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Dịch Vọng', description: 'Ward' })
  @IsNotEmpty()
  @IsString()
  ward: string;

  @ApiProperty({ example: 'Số 10 Phạm Hùng', description: 'Detailed street address' })
  @IsNotEmpty()
  @IsString()
  addressDetail: string;

  @ApiProperty({ required: false, description: 'Whether to also update customer default address' })
  @IsOptional()
  @IsBoolean()
  updateDefaultAddress?: boolean;
}
