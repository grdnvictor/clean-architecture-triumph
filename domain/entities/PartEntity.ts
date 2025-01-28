export class PartEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly reference: string,
        public readonly stock: number,
        public readonly minimumStock: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        name: string,
        reference: string,
        stock: number = 0,
        minimumStock: number = 1
    ) {
        return new PartEntity(
            crypto.randomUUID(),
            name,
            reference,
            stock,
            minimumStock,
            new Date(),
            new Date()
        );
    }
}