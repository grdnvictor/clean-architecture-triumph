import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import {DatabaseConnection} from "../connection";
import {ModelRepository} from "../../../application/repositories/ModelRepository";
import {ModelEntity} from "../../../domain/entities/ModelEntity";

export class ModelRepositoryPg implements ModelRepository {
    private client: Client;
    private tableName: string;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
        this.tableName = "model";
    }

    public async findByOption(options: {
        where?: Record<string, any>,
        select?: string[],
        orderBy?: string,
        limit?: number,
        offset?: number,
    } = {}):Promise<ModelEntity[] | null>  {
        const {
            where = {},
            select = ['*'],
            orderBy = 'id DESC',
            limit = 100,
            offset = 0,
        } = options;
        try{
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

            const result = await this.client.queryObject<ModelEntity>(query);
            const row = result.rows[0];
            return row ? ModelEntity.create(row.name,row.year,row.brand_id,row.specifications,row.maintenanceIntervalKm,row.maintenanceIntervalMonths) : null;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return null;
        }
    }
    public async all(): Promise<ModelEntity[]> {
        try{
            const query = `
                SELECT *
                FROM ${this.tableName}
            `;
            const result = await this.client.queryObject<ModelEntity>(query);
            return result.rows;
        }catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return [];
        }
    }
    public async save(model: ModelEntity) {
        return Promise.resolve();
    }

}
