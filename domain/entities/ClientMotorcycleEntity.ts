export class ClientMotorcycleEntity {
    private constructor(
        public readonly identifier: string,
        public readonly clientId: string,
        public readonly motorcycleId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(clientId: string, motorcycleId: string) {
        return new ClientMotorcycleEntity(
            crypto.randomUUID(),
            clientId,
            motorcycleId,
            new Date(),
            new Date()
        );
    }
}