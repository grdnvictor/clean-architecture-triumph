export class RepairEntity {
    private constructor(
        public readonly identifier: string,
        public readonly incidentId: string,
        public readonly description: string,
        public readonly cost: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        incidentId: string,
        description: string,
        cost: number
    ) {
        return new RepairEntity(
            crypto.randomUUID(),
            incidentId,
            description,
            cost,
            new Date(),
            new Date()
        );
    }
}