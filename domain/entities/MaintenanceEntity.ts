export class MaintenanceEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly description: string,
        public readonly mileage: number,
        public readonly technicianNotes: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        description: string,
        mileage: number,
        technicianNotes: string = ''
    ) {
        return new MaintenanceEntity(
            crypto.randomUUID(),
            motorcycleId,
            description,
            mileage,
            technicianNotes,
            new Date(),
            new Date()
        );
    }
}