import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import {DatabaseConnection} from "../../connection.ts";
import {BrandRepository} from "../../../../application/repositories/BrandRepository.ts";
import {BrandEntity} from "../../../../domain/entities/BrandEntity.ts";

export class BrandRepositoryPostgres implements BrandRepository {
    private client: Client;
    private tableName: string;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
        this.tableName = "brand";
    }

    public async all(): Promise<BrandEntity[]> {
        try {
            const query = `
                SELECT *
                FROM ${this.tableName}
            `;
            const result = await this.client.queryObject<BrandEntity>(query);
            console.log(result);
            return result.rows;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return [];
        }
    }
    public async save(brand: BrandEntity): Promise<void> {
        try {
            const query = `
                INSERT INTO ${this.tableName} (name)
                VALUES ('${brand.name}')
            `;

            await this.client.queryObject<BrandEntity>(query);
        } catch (error) {
            console.error(`Error in insert for ${this.tableName}:`, error);
        }
    }


}