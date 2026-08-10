import { Controller, Post, Get, Body, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginAdminUseCase } from '@application/use-cases/admin-auth/login-admin.use-case';
import { LoginDto } from '@application/dto/admin-auth.dto';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    @Inject('LoginAdminUseCase')
    private readonly loginAdminUseCase: LoginAdminUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập Admin Management Portal' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công, trả về JWT Access Token' })
  @ApiResponse({ status: 401, description: 'Email hoặc mật khẩu không chính xác' })
  async login(@Body() dto: LoginDto) {
    return this.loginAdminUseCase.execute(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin tài khoản Admin đang đăng nhập' })
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
