import { GenerateTopupQrUseCase } from './generate-topup-qr.use-case';
import { GetGoldWalletUseCase } from './get-gold-wallet.use-case';
import { ApproveTopupUseCase } from '../admin/approve-topup.use-case';
import { Customer } from '@domain/entities/customer.entity';

describe('GOLD Wallet Use Cases', () => {
  let customerRepo: any;
  let walletRepo: any;
  let generateTopupQrUseCase: GenerateTopupQrUseCase;
  let getGoldWalletUseCase: GetGoldWalletUseCase;
  let approveTopupUseCase: ApproveTopupUseCase;

  const mockCustomer = new Customer(
    'cust_123',
    'Lê Anh Tuấn',
    '0978785678',
    'anhtuan@gmail.com',
    'hash',
    0,
    0,
    true,
    new Date(),
    new Date(),
    [],
  );

  beforeEach(() => {
    const transactions: any[] = [];
    customerRepo = {
      findById: jest.fn().mockImplementation(async (id: string) => {
        return id === mockCustomer.id ? mockCustomer : null;
      }),
      save: jest.fn().mockImplementation(async (c: Customer) => c),
    };

    walletRepo = {
      saveTransaction: jest.fn().mockImplementation(async (tx: any) => {
        transactions.push(tx);
        return tx;
      }),
      findTransactionsByCustomerId: jest.fn().mockImplementation(async (cId: string) => {
        return transactions.filter((t) => t.customerId === cId);
      }),
      findPendingTopups: jest.fn().mockImplementation(async () => {
        return transactions.filter((t) => t.status === 'PENDING');
      }),
      findTransactionById: jest.fn().mockImplementation(async (id: string) => {
        return transactions.find((t) => t.id === id) || null;
      }),
    };

    generateTopupQrUseCase = new GenerateTopupQrUseCase(customerRepo, walletRepo);
    getGoldWalletUseCase = new GetGoldWalletUseCase(customerRepo, walletRepo);
    approveTopupUseCase = new ApproveTopupUseCase(customerRepo, walletRepo);
  });

  it('should generate VietQR topup request with correct conversion (1.000 VNĐ = 1 GOLD)', async () => {
    const result = await generateTopupQrUseCase.execute('cust_123', { amountVnd: 200000 });

    expect(result).toBeDefined();
    expect(result.amountVnd).toBe(200000);
    expect(result.goldAmount).toBe(200); // 200.000 / 1.000
    expect(result.transferContent).toBe('GP NAP 0978785678');
    expect(result.qrCodeUrl).toContain('vietqr.io');
    expect(result.status).toBe('PENDING');
  });

  it('should approve topup request and update customer gold balance', async () => {
    const topup = await generateTopupQrUseCase.execute('cust_123', { amountVnd: 500000 });

    const pending = await approveTopupUseCase.getPendingTopups();
    expect(pending.length).toBe(1);

    const approveResult = await approveTopupUseCase.execute(topup.transactionId, 'APPROVE');
    expect(approveResult.success).toBe(true);
    expect(mockCustomer.goldBalance).toBe(500);

    const wallet = await getGoldWalletUseCase.execute('cust_123');
    expect(wallet.goldBalance).toBe(500);
  });
});
