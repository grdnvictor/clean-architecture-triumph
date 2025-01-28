export class CompanyEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly userId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(name: string, userId: string) {
        return new CompanyEntity(
            crypto.randomUUID(),
            name,
            userId,
            new Date(),
            new Date()
        );
    }
}