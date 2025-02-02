import type { MotorcycleRepository } from "../../../application/repositories/MotorcycleRepository.ts";
import type { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity.ts";
import {UserRepository} from "../../../application/repositories/UserRepository.ts";

export class UserRepositoryInMemory implements UserRepository {
    public constructor(public readonly users: UserEntity[]) {}

    public save(user: UserEntity): Promise<void> {
        this.users.push(user);

        return Promise.resolve();
    }

    public all(): Promise<UserEntity[]> {
        return Promise.resolve(this.users);
    }

    // public findOneBy(search:string,search: string): Promise<UserEntity | null> {
    //     const foundUser = this.users.find((user) => {
    //         return user.search === value;
    //     });
    //
    //     return Promise.resolve(foundUser ?? null);
    // }
}
