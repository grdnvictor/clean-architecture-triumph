import type { UserEntity } from "../../domain/entities/UserEntity.ts";

export interface UserRepository {
    save(user: UserEntity ): Promise<void>;
    all(): Promise<UserEntity[]>;
    findOneByEmail(email: string): Promise<UserEntity | null>;
}
