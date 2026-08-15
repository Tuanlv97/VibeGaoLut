import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IComboRepository, ComboFilterOptions } from '@domain/repositories/combo.repository.interface';
import { Combo } from '@domain/entities/combo.entity';
import { ComboOrmEntity } from '../database/entities/combo.orm-entity';
import { ComboMapper } from '../database/mappers/combo.mapper';

@Injectable()
export class ComboTypeOrmRepository implements IComboRepository {
  constructor(
    @InjectRepository(ComboOrmEntity)
    private readonly comboRepo: Repository<ComboOrmEntity>,
  ) {}

  async findById(id: string): Promise<Combo | null> {
    const entity = await this.comboRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    return entity ? ComboMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string): Promise<Combo | null> {
    const entity = await this.comboRepo.findOne({
      where: { slug },
      relations: ['items', 'items.product'],
    });
    return entity ? ComboMapper.toDomain(entity) : null;
  }

  async findAll(filter?: ComboFilterOptions): Promise<Combo[]> {
    const query = this.comboRepo
      .createQueryBuilder('combo')
      .leftJoinAndSelect('combo.items', 'item')
      .leftJoinAndSelect('item.product', 'product');

    if (filter?.isActive !== undefined) {
      query.andWhere('combo.isActive = :isActive', { isActive: filter.isActive });
    }

    if (filter?.comboType) {
      query.andWhere('combo.comboType = :comboType', { comboType: filter.comboType });
    }

    if (filter?.search) {
      query.andWhere('(combo.name ILIKE :search OR combo.shortDescription ILIKE :search)', {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy('combo.createdAt', 'DESC');

    const entities = await query.getMany();
    return entities.map((e) => ComboMapper.toDomain(e));
  }

  async save(combo: Combo): Promise<Combo> {
    const ormEntity = ComboMapper.toOrm(combo);
    const saved = await this.comboRepo.save(ormEntity);
    return ComboMapper.toDomain(saved);
  }
}
