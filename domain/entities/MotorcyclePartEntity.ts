export class MotorcyclePartEntity {
    private constructor(
        public readonly identifier: string,
        public readonly motorcycleId: string,
        public readonly partId: string,
        public readonly quantity: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(motorcycleId: string, partId: string, quantity: number) {
        return new MotorcyclePartEntity(
            crypto.randomUUID(),
            motorcycleId,
            partId,
            quantity,
            new Date(),
            new Date()
        );
    }
}