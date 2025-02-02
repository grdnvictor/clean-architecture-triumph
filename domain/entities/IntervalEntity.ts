export class IntervalEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly maintenanceId: string,
        public readonly mileage: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        maintenanceId: string,
        mileage: number
    ) {
        return new IntervalEntity(
            crypto.randomUUID(),
            motorcycleId,
            maintenanceId,
            mileage,
            new Date(),
            new Date()
        );
    }
}