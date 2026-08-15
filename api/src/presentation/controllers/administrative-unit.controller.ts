import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { AdministrativeUnitOrmEntity } from '@infrastructure/database/entities/administrative-unit.orm-entity';

@ApiTags('Administrative Units')
@Controller('administrative-units')
export class AdministrativeUnitController {
  constructor(
    @InjectRepository(AdministrativeUnitOrmEntity)
    private readonly adminUnitRepo: Repository<AdministrativeUnitOrmEntity>,
  ) {}

  @Get('provinces')
  @ApiOperation({ summary: 'Lấy danh sách 34 Tỉnh / Thành phố (Cấp 1 - parentId = null)' })
  async getProvinces() {
    return this.adminUnitRepo.find({
      where: { parentId: IsNull() },
      order: { name: 'ASC' },
    });
  }

  @Get('children/:parentId')
  @ApiOperation({ summary: 'Lấy danh sách Phường / Xã trực thuộc parentId' })
  async getChildren(@Param('parentId') parentId: string) {
    return this.adminUnitRepo.find({
      where: { parentId },
      order: { name: 'ASC' },
    });
  }

  @Get('wards/:provinceId')
  @ApiOperation({ summary: 'Lấy danh sách Phường / Xã theo Tỉnh/Thành phố' })
  async getWardsByProvince(@Param('provinceId') provinceId: string) {
    return this.adminUnitRepo.find({
      where: { parentId: provinceId },
      order: { name: 'ASC' },
    });
  }
}
