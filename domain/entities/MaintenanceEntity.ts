export enum MaintenanceStatus {
    PENDING = 'PENDING',
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
    OVERDUE = 'OVERDUE'
}

export class MaintenanceEntity {

    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly schedule_id: string,
        public readonly dueDate: Date,
        public readonly mileage: number,
        public readonly technicianNotes: string,
        public readonly status: MaintenanceStatus,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        schedule_id: string,
        dueDate: Date,
        mileage: number,
        technicianNotes: string,
        status: MaintenanceStatus.PENDING
    ) {
        return new MaintenanceEntity(
            crypto.randomUUID(),
            motorcycleId,
            schedule_id,
            dueDate,
            mileage,
            technicianNotes,
            status,
            new Date(),
            new Date()
        );
    }
}