import {PhoneNumber} from "../types/PhoneNumber.ts";
import {Siret} from "../types/Siret.ts";

export class ConcessionEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly siret: string,
        public readonly address: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(name: string, phoneNumber: PhoneNumber, siret: Siret, address: string) {
        return new ConcessionEntity(
            crypto.randomUUID(),
            name,
            phoneNumber.value,
            siret.value,
            address,
            new Date(),
            new Date()
        );
    }
}