export class IncidentEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly description: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        motorcycleId: string,
        description: string,
    ) {
        return new IncidentEntity(
            crypto.randomUUID(),
            motorcycleId,
            description,
            new Date(),
            new Date()
        );
    }
}