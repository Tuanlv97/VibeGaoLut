import { StockMovement } from '../entities/stock-movement.entity';

export interface IStockMovementRepository {
  save(movement: StockMovement): Promise<StockMovement>;
  findAll(): Promise<StockMovement[]>;
  findByProductId(productId: string): Promise<StockMovement[]>;
}
