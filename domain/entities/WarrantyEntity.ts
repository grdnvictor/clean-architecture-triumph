export class WarrantyEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly terms: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        startDate: Date,
        endDate: Date,
        terms: string
    ) {
        return new WarrantyEntity(
            crypto.randomUUID(),
            motorcycleId,
            startDate,
            endDate,
            terms,
            new Date(),
            new Date()
        );
    }
}