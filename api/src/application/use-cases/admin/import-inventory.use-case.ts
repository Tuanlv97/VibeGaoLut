import { randomUUID } from 'crypto';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IStockMovementRepository } from '@domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '@domain/entities/stock-movement.entity';
import { Product } from '@domain/entities/product.entity';

export interface ImportInventoryInput {
  productId: string;
  quantity: number;
  unitCost?: number;
  supplier?: string;
  note?: string;
  createdByName?: string;
}

export interface ImportInventoryResult {
  product: Product;
  movement: StockMovement;
}

export class ImportInventoryUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly stockMovementRepository: IStockMovementRepository,
  ) {}

  async execute(input: ImportInventoryInput): Promise<ImportInventoryResult> {
    if (!input.productId) {
      throw new Error('Mã sản phẩm không được để trống.');
    }
    if (!input.quantity || input.quantity <= 0) {
      throw new Error('Số lượng nhập kho phải lớn hơn 0.');
    }

    const product = await this.productRepository.findById(input.productId);
    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${input.productId}.`);
    }

    // Tăng tồn kho
    product.stockQuantity += input.quantity;
    await this.productRepository.save(product);

    // Ghi nhật ký nhập kho INWARD
    const movement = new StockMovement(
      randomUUID(),
      product.id,
      product.name,
      'INWARD',
      input.quantity,
      input.unitCost || 0,
      input.supplier || '',
      input.note || 'Nhập hàng vào kho',
      input.createdByName || 'System Admin',
      new Date(),
    );

    const savedMovement = await this.stockMovementRepository.save(movement);

    return {
      product,
      movement: savedMovement,
    };
  }
}
