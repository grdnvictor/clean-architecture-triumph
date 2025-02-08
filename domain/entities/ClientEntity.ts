import {Firstname} from "../types/Firstname.ts";
import {Lastname} from "../types/Lastname.ts";

export class ClientEntity {
    private constructor(
        public readonly identifier: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly concessionId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(firstName: Firstname, lastName: Lastname, concessionId: string) {
        return new ClientEntity(
            crypto.randomUUID(),
            firstName.value,
            lastName.value,
            concessionId,
            new Date(),
            new Date()
        );
    }
}