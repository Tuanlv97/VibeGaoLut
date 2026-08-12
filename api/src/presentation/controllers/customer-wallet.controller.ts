import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerJwtAuthGuard } from '@infrastructure/auth/customer-jwt-auth.guard';
import { GenerateTopupQrUseCase, GenerateTopupQrDto } from '@application/use-cases/customer-wallet/generate-topup-qr.use-case';
import { GetGoldWalletUseCase } from '@application/use-cases/customer-wallet/get-gold-wallet.use-case';

@ApiTags('Customer Wallet')
@ApiBearerAuth()
@UseGuards(CustomerJwtAuthGuard)
@Controller('customer/wallet')
export class CustomerWalletController {
  constructor(
    private readonly generateTopupQrUseCase: GenerateTopupQrUseCase,
    private readonly getGoldWalletUseCase: GetGoldWalletUseCase,
  ) {}

  @Get('history')
  @ApiOperation({ summary: 'Xem số dư Ví GOLD và lịch sử biến động' })
  async getWalletHistory(@Request() req: any) {
    return this.getGoldWalletUseCase.execute(req.user.customerId);
  }

  @Post('topup-qr')
  @ApiOperation({ summary: 'Tạo mã VietQR nạp tiền quy đổi ra GOLD' })
  async generateTopupQr(@Request() req: any, @Body() dto: GenerateTopupQrDto) {
    return this.generateTopupQrUseCase.execute(req.user.customerId, dto);
  }
}
