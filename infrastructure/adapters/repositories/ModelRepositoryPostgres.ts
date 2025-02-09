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
    public async save(model: ModelEntity): Promise<void> {
        try {
            const query = `

                INSERT INTO ${this.tableName} (name, year, brand_id, description, maintenance_interval_km, maintenance_interval_months)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            await this.client.queryArray(query, [
                model.name,
                model.year,
                model.brandId,
                JSON.stringify(model.description),
                model.maintenanceIntervalKm,
                model.maintenanceIntervalMonths
            ]);
        } catch (error) {
            console.error(`Error in insert for ${this.tableName}:`, error);
        }
    }

}