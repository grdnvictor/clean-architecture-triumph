import type { UserEntity } from "../../domain/entities/UserEntity.ts";

export interface UserRepository {
    save(user: UserEntity ): Promise<void>;
    all(): Promise<UserEntity[]>;
    findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<UserEntity[]>;
}
