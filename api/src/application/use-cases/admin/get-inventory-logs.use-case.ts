import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IStockMovementRepository } from '@domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '@domain/entities/stock-movement.entity';

export interface StockReportItem {
  id: string;
  name: string;
  slug: string;
  stockQuantity: number;
  price: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface InventoryOverview {
  totalProducts: number;
  totalStockQuantity: number;
  lowStockCount: number;
  outOfStockCount: number;
  movements: StockMovement[];
  stockReport: StockReportItem[];
}

export class GetInventoryLogsUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly stockMovementRepository: IStockMovementRepository,
  ) {}

  async execute(): Promise<InventoryOverview> {
    const { items: products } = await this.productRepository.findAll();
    const movements = await this.stockMovementRepository.findAll();

    let totalStockQuantity = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    const stockReport: StockReportItem[] = products.map((p) => {
      totalStockQuantity += p.stockQuantity;
      let status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' = 'IN_STOCK';
      if (p.stockQuantity === 0) {
        status = 'OUT_OF_STOCK';
        outOfStockCount++;
      } else if (p.stockQuantity <= 5) {
        status = 'LOW_STOCK';
        lowStockCount++;
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        stockQuantity: p.stockQuantity,
        price: p.price,
        status,
      };
    });

    return {
      totalProducts: products.length,
      totalStockQuantity,
      lowStockCount,
      outOfStockCount,
      movements,
      stockReport,
    };
  }
}
