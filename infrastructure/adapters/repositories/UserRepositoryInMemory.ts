import {Client} from "../connection";
import  {UserRepository} from "../../../application/repositories/UserRepository";
import {UserEntity} from "../../../domain/entities/UserEntity";

export class UserRepositoryInMemory implements UserRepository {
    public constructor(public readonly users: UserEntity[]) {}

    public save(user: UserEntity): Promise<void> {
        this.users.push(user);

        return Promise.resolve();
    }

    public all(): Promise<UserEntity[]> {
        return Promise.resolve(this.users);
    }
    public findOneByEmail(email: string): Promise<UserEntity | null> {
    }

}
