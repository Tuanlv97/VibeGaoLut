export class AdministrativeUnit {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly fullName: string,
    public readonly level: 'PROVINCE' | 'WARD',
    public readonly parentId: string | null = null,
  ) {}
}
