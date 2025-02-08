import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import {ModelRepository} from "../../../application/repositories/ModelRepository.ts";
import {DatabaseConnection} from "../connection.ts";
import {ModelEntity} from "../../../domain/entities/ModelEntity.ts";

export class ModelRepositoryPostgres implements ModelRepository{
    private client: Client;
    private tableName: string;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
        this.tableName = "model";
    }
    public async all(): Promise<ModelEntity[]> {
        try {
            const query = `
                SELECT *
                FROM ${this.tableName}
            `;
            const result =  await this.client.queryObject<ModelEntity>(query);
            console.log(result);
            return result.rows;
        } catch (error) {
            console.error(`Error in selectBy for ${this.tableName}:`, error);
            return [];
        }
    }

}