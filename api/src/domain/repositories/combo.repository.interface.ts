import { Combo, ComboType } from '../entities/combo.entity';

export interface ComboFilterOptions {
  comboType?: ComboType;
  search?: string;
  isActive?: boolean;
}

export interface IComboRepository {
  findById(id: string): Promise<Combo | null>;
  findBySlug(slug: string): Promise<Combo | null>;
  findAll(filter?: ComboFilterOptions): Promise<Combo[]>;
  save(combo: Combo): Promise<Combo>;
}
