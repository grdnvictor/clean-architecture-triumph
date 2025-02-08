import {DatabaseConnection} from "../connection";
import {BrandRepository} from "../../../application/repositories/BrandRepository";
import {BrandEntity} from "../../../domain/entities/BrandEntity";
import {UserEntity} from "../../../domain/entities/UserEntity";

export class BrandRepositoryPg implements BrandRepository {
    private dbConnection: DatabaseConnection;
    private tableName: string;

    constructor() {
        this.dbConnection = DatabaseConnection.getInstance();
        this.tableName = "brand";
    }

    async all(): Promise<BrandEntity[]> {
        try {
            const client = this.dbConnection.getClient();
            const query = `
                SELECT *
                FROM ${this.tableName}
            `;

            const result = await client.queryObject<BrandEntity>(query);
            console.log(result);
            return result.rows;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return [];
        }
    }
    async save(brand: any): Promise<void> {
        try {
            const client = this.dbConnection.getClient();
            const query = `
                INSERT INTO ${this.tableName} (name, description)
                VALUES ('${brand.name}', '${brand.description}')
            `;

            await client.queryObject<any>(query);
        } catch (error) {
            console.error(`Error in insert for ${this.tableName}:`, error);
        }
    }

    async findByOption(options: {
        where?: Record<string, any>,
        select?: string[],
        orderBy?: string,
        limit?: number,
        offset?: number,
    } = {}):Promise<BrandEntity[] | null>  {
        const {
            where = {},
            select = ['*'],
            orderBy = 'id DESC',
            limit = 100,
            offset = 0,
        } = options;
        try{
            // await this.dbConnection.connect();
            const client = this.dbConnection.getClient();
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

            const result = await client.queryObject<BrandEntity>(query);
            const row = result.rows[0];
            return row ? UserEntity.create(row.email, row.password, row.isAdmin) : null;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return null;
        }
    }
}