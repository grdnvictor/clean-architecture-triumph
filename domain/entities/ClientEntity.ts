export class ClientEntity {
    private constructor(
        public readonly identifier: string,
        public readonly userId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(userId: string, firstName: string, lastName: string) {
        return new ClientEntity(
            crypto.randomUUID(),
            userId,
            firstName,
            lastName,
            new Date(),
            new Date()
        );
    }
}