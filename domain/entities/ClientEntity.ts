import {Firstname} from "../types/Firstname.ts";
import {Lastname} from "../types/Lastname.ts";
import {PhoneNumber} from "../types/PhoneNumber.ts";

export class ClientEntity {
    private constructor(
        public readonly identifier: string,
        public readonly firstName: string,
        public readonly lastName: string,
        private readonly phone: string,
        public readonly concessionId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(firstName: Firstname, lastName: Lastname, phone:PhoneNumber, concessionId: string) {
        return new ClientEntity(
            crypto.randomUUID(),
            firstName.value,
            lastName.value,
            phone.value,
            concessionId,
            new Date(),
            new Date()
        );
    }
}