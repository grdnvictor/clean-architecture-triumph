import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import {DatabaseConnection} from "../../connection.ts";
import {UserRepository} from "../../../../application/repositories/UserRepository.ts";
import {UserEntity} from "../../../../domain/entities/UserEntity.ts";

export class UserRepositoryPostgres implements UserRepository {
    private client: Client;
    private tableName: string;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
        this.tableName = "users";
    }

    public async findByOption(options: {
        where?: Record<string, any>,
        select?: string[],
        orderBy?: string,
        limit?: number,
        offset?: number,
    } = {}):Promise<UserEntity[] | null>  {
        const {
            where = {},
            select = ['*'],
            orderBy = 'id DESC',
            limit = 100,
            offset = 0,
        } = options;
        try{
           // await this.dbConnection.connect();
            const whereConditions = Object.entries(where).map(([key, value]) => {
                if (value === null) return `${key} IS NULL`;
                if (Array.isArray(value)) return `${key} IN (${value.map(v => `'${v}'`).join(',')})`;
                return `${key} = '${value}'`;
            });
            const query = `
                SELECT ${select.join(', ')}
                FROM ${this.tableName}
                         ${whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''}
                ORDER BY ${orderBy}
                    LIMIT ${limit}
                OFFSET ${offset}
            `;

            const result = await this.client.queryObject<UserEntity>(query);
            const row = result.rows[0];
            return row ? UserEntity.create(row.email, row.password, row.isAdmin) : null;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return null;
        }
    }
    public all(): Promise<UserEntity[]> {
        return Promise.resolve(this.users);
    }
    public async save(user: UserEntity) {
        return Promise.resolve();
    }

}
