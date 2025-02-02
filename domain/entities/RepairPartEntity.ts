export class RepairPartEntity {
    private constructor(
        public readonly identifier: string,
        public readonly repairId: string,
        public readonly partId: string,
        public readonly quantity: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        repairId: string,
        partId: string,
        quantity: number
    ) {
        return new RepairPartEntity(
            crypto.randomUUID(),
            repairId,
            partId,
            quantity,
            new Date(),
            new Date()
        );
    }
}