import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class TrackOrderQueryDto {
  @ApiProperty({ example: 'GP-883920', description: 'Order number' })
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @ApiProperty({ example: '0912345678', description: 'Customer phone number' })
  @IsNotEmpty()
  @Matches(/^0[35789]\d{8}$/, { message: 'Số điện thoại không đúng định dạng Việt Nam.' })
  customerPhone: string;
}
