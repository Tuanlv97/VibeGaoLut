export class CustomerAddress {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public recipientName: string,
    public phone: string,
    public province: string,
    public district: string,
    public ward: string,
    public addressDetail: string,
    public isDefault: boolean = false,
    public readonly createdAt: Date = new Date(),
  ) {}
}
