import { Brand } from "../types/Brand";

export class BrandEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: Brand,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        name: string
    ) {
        const brand = Brand.from(name);
        return new BrandEntity(
            crypto.randomUUID(),
            brand,
            new Date(),
            new Date()
        );
    }
}