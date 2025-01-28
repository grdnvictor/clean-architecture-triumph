export class CompanyMotorcycleEntity {
    private constructor(
        public readonly identifier: string,
        public readonly companyId: string,
        public readonly motorcycleId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(companyId: string, motorcycleId: string) {
        return new CompanyMotorcycleEntity(
            crypto.randomUUID(),
            companyId,
            motorcycleId,
            new Date(),
            new Date()
        );
    }
}