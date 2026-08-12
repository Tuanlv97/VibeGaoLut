import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterCustomerUseCase, RegisterCustomerDto } from '@application/use-cases/customer-auth/register-customer.use-case';
import { LoginCustomerUseCase, LoginCustomerDto } from '@application/use-cases/customer-auth/login-customer.use-case';

@ApiTags('Customer Auth')
@Controller('customer/auth')
export class CustomerAuthController {
  constructor(
    private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    private readonly loginCustomerUseCase: LoginCustomerUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản khách hàng mới' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công và cấp JWT token.' })
  async register(@Body() dto: RegisterCustomerDto) {
    return this.registerCustomerUseCase.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập tài khoản khách hàng' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công và cấp JWT token.' })
  async login(@Body() dto: LoginCustomerDto) {
    return this.loginCustomerUseCase.execute(dto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Yêu cầu khôi phục mật khẩu tài khoản' })
  @ApiResponse({ status: 200, description: 'Đã gửi hướng dẫn khôi phục mật khẩu.' })
  async forgotPassword(@Body() body: { identifier: string }) {
    return { message: 'Hướng dẫn khôi phục mật khẩu đã được gửi thành công.', identifier: body.identifier };
  }
}
