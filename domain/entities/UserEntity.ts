import { Status } from "../types/Status.ts";

export class UserEntity {
    private constructor(
        public readonly identifier: string,
        public readonly email: string,
        public readonly password: string,
        public readonly isAdmin: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        email: string,
        password: string,
        isAdmin: boolean = false
    ) {
        return new UserEntity(
            crypto.randomUUID(),
            email,
            password,
            isAdmin,
            new Date(),
            new Date()
        );
    }
}