export class IntervalEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly maintenanceId: string,
        public readonly distanceInterval: number,
        public readonly timeInterval: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        maintenanceId: string,
        distanceInterval: number,
        timeInterval: number
    ) {
        return new IntervalEntity(
            crypto.randomUUID(),
            motorcycleId,
            maintenanceId,
            distanceInterval,
            timeInterval,
            new Date(),
            new Date()
        );
    }
}