export class TrialEntity {
    private constructor(
        public readonly identifier: string,
        public readonly clientId: string,
        public readonly motorcycleId: string,
        public readonly concessionId: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly mileageStart: number,
        public readonly mileageEnd: number | null,
        public readonly feedback: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        clientId: string,
        motorcycleId: string,
        concessionId: string,
        startDate: Date,
        endDate: Date,
        mileageStart: number
    ) {
        return new TrialEntity(
            crypto.randomUUID(),
            clientId,
            motorcycleId,
            concessionId,
            startDate,
            endDate,
            mileageStart,
            null,
            null,
            new Date(),
            new Date()
        );
    }
}