import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IComboRepository } from '@domain/repositories/combo.repository.interface';
import { Combo } from '@domain/entities/combo.entity';

@Injectable()
export class GetComboDetailUseCase {
  constructor(
    @Inject('IComboRepository')
    private readonly comboRepository: IComboRepository,
  ) {}

  async execute(slug: string): Promise<Combo> {
    const combo = await this.comboRepository.findBySlug(slug);
    if (!combo) {
      throw new NotFoundException(`Gói Combo với slug "${slug}" không tồn tại.`);
    }
    return combo;
  }
}
