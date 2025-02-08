export class ModelEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly year: number,
        public readonly brandId: string,
        public readonly specifications: Record<string, unknown>,
        public readonly maintenanceIntervalKm: number,
        public readonly maintenanceIntervalMonths: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        name: string,
        year: number,
        brandId: string,
        specifications: Record<string, unknown>,
        maintenanceIntervalKm: number,
        maintenanceIntervalMonths: number
    ) {
        return new ModelEntity(
            crypto.randomUUID(),
            name,
            year,
            brandId,
            specifications,
            maintenanceIntervalKm,
            maintenanceIntervalMonths,
            new Date(),
            new Date()
        );
    }
}