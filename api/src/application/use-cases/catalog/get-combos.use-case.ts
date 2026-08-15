import { Injectable, Inject } from '@nestjs/common';
import { IComboRepository, ComboFilterOptions } from '@domain/repositories/combo.repository.interface';
import { Combo } from '@domain/entities/combo.entity';

@Injectable()
export class GetCombosUseCase {
  constructor(
    @Inject('IComboRepository')
    private readonly comboRepository: IComboRepository,
  ) {}

  async execute(filter?: ComboFilterOptions): Promise<Combo[]> {
    return this.comboRepository.findAll(filter);
  }
}
