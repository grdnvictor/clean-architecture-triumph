export class UserEntity {
    private constructor(
        public readonly identifier: string,
        public readonly email: string,
        public readonly password: string,
        public readonly isAdmin: boolean,
        public readonly concessionId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        email: string,
        password: string,
        concessionId: string,
        isAdmin: boolean = false
    ) {
        return new UserEntity(
            crypto.randomUUID(),
            email,
            password,
            isAdmin,
            concessionId,
            new Date(),
            new Date()
        );
    }
}