import {Firstname} from "../types/Firstname.ts";
import {Lastname} from "../types/Lastname.ts";

export class ClientEntity {
    private constructor(
        public readonly identifier: string,
        public readonly userId: string,
        public readonly firstName: Firstname,
        public readonly lastName: Lastname,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(userId: string, firstName: Firstname, lastName: Lastname) {
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