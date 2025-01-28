export class ConcessionEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly userId: string,
        public readonly address: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(name: string, userId: string, address: string) {
        return new ConcessionEntity(
            crypto.randomUUID(),
            name,
            userId,
            address,
            new Date(),
            new Date()
        );
    }
}