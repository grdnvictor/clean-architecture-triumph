import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import type {ClientMotorcycleRepository} from "../../../../application/repositories/ClientMotorcycleRepository.ts";
import {DatabaseConnection} from "../../connection.ts";
import {ClientMotorcycleEntity} from "../../../../domain/entities/ClientMotorcycleEntity.ts";

export class ClientMotorcycleRepositoryPostgres implements ClientMotorcycleRepository {
    private client: Client;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
    }

    public async findOneByClientId(id: string): Promise<ClientMotorcycleEntity | null> {
        const result = await this.client.queryObject<ClientMotorcycleEntity>(
            "SELECT * FROM client_motorcycle WHERE client_id = $ID",
            {
                ID:id
            }
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }
}