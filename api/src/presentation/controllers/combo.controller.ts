import { Controller, Get, Param, Query, NotFoundException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetCombosUseCase } from '@application/use-cases/catalog/get-combos.use-case';
import { GetComboDetailUseCase } from '@application/use-cases/catalog/get-combo-detail.use-case';
import { ComboType } from '@domain/entities/combo.entity';

@ApiTags('Catalog')
@Controller('combos')
export class ComboController {
  constructor(
    @Inject('GetCombosUseCase') private readonly getCombosUseCase: GetCombosUseCase,
    @Inject('GetComboDetailUseCase') private readonly getComboDetailUseCase: GetComboDetailUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách các Gói Combo Thực Phẩm Ăn Chay theo mục tiêu' })
  @ApiQuery({ name: 'type', required: false, enum: ['WEIGHT_LOSS', 'WEIGHT_GAIN', 'HEALTH', 'OFFICE', 'FAMILY'] })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Danh sách Combo thực phẩm ăn chay' })
  async getCombos(
    @Query('type') type?: ComboType,
    @Query('search') search?: string,
  ) {
    return this.getCombosUseCase.execute({ comboType: type, search, isActive: true });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Lấy chi tiết Gói Combo Thực Phẩm Ăn Chay theo Slug' })
  @ApiResponse({ status: 200, description: 'Chi tiết Gói Combo kèm thực đơn 7 ngày' })
  @ApiResponse({ status: 404, description: 'Gói Combo không tồn tại' })
  async getComboDetail(@Param('slug') slug: string) {
    return this.getComboDetailUseCase.execute(slug);
  }
}
