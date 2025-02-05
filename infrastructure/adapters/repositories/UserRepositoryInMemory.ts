import {pool} from "../connection";
import  {UserRepository} from "../../../application/repositories/UserRepository";
import {UserEntity} from "../../../domain/entities/UserEntity";

export class UserRepositoryInMemory implements UserRepository {
    public constructor(public readonly users: UserEntity[]) {}

  /*  public async save(user: UserEntity): Promise<void> {
        const query = `
            INSERT INTO users (id, email, password)
            VALUES ($1, $2, $3)
            ON CONFLICT (id) DO UPDATE
            SET email = EXCLUDED.email, password = EXCLUDED.password;
        `;
        const values = [user.id, user.email, user.password];
        await pool.query(query, values);
    }*/

    public all(): Promise<UserEntity[]> {
        return Promise.resolve(this.users);
    }
    public async findOneByEmail(email: string): Promise<UserEntity | null> {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new UserEntity(row.id, row.email, row.password);
    }

}
