import { ICustomerRepository } from '@domain/repositories/customer.repository.interface';
import { Customer } from '@domain/entities/customer.entity';

export class UpdateCustomerStatusUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(id: string, isActive: boolean): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error(`Không tìm thấy khách hàng với mã ID: ${id}`);
    }

    customer.isActive = isActive;
    customer.updatedAt = new Date();
    return await this.customerRepository.save(customer);
  }
}
