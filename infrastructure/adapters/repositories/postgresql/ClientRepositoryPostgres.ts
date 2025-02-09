import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import type { MotorcycleEntity } from "../../../../domain/entities/MotorcycleEntity.ts";
import { DatabaseConnection } from "../../connection.ts";
import {ClientRepository} from "../../../../application/repositories/ClientRepository";
import {ClientEntity} from "../../../../domain/entities/ClientEntity";

export class ClientRepositoryPostgres implements ClientRepository {
  private client: Client;

  constructor() {
    this.client = DatabaseConnection.getInstance().getClient();
  }

  public async save(client: ClientEntity): Promise<void> {

    await this.client.queryArray(
        `INSERT INTO client (id, concessionid, firstname, lastname, createdAt, updatedAt)
        VALUES ($IDENTIFIER, $CONCESSIONID, $FIRSTNAME, $LASTNAME, $CREATED_AT, $UPDATED_AT)`,
        {
            IDENTIFIER: client.identifier,
            FIRSTNAME: client.firstName,
            LASTNAME: client.lastName,
            CONCESSIONID: client.concessionId,
            CREATED_AT: new Date(),
            UPDATED_AT: new Date()
        }
    );
  }

  public async all(): Promise<ClientEntity[]> {
    const result = await this.client.queryObject<ClientEntity>("SELECT * FROM client");
    return result.rows;
  }

  public async findOneById(id: string): Promise<ClientEntity | null> {
    const result = await this.client.queryObject<ClientEntity>(
        "SELECT * FROM client WHERE id = $ID",
        {
            ID: id
        }
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async update(id: string, updatedData: Partial<ClientEntity>): Promise<void> {
    await this.client.queryArray(
        "UPDATE client SET firstname = COALESCE($FIRSTNAME, firstname), lastname = COALESCE($LASTNAME, lastname), updatedAt = NOW() WHERE id = $ID",
        {
            ID: id,
            FIRSTNAME: updatedData.firstName,
            LASTNAME: updatedData.lastName
        }
    );
  }

  public async delete(id: string): Promise<void> {
    await this.client.queryArray("DELETE FROM client WHERE id = $CLIENT", {
        CLIENT: id
    });
  }

  public async findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<ClientEntity[]> {
        let query = "SELECT ";

        if (options.select && options.select.length > 0) {
            query += options.select.join(", ");
        } else {
            query += "*";
        }

        query += " FROM client";

        const whereClauses: string[] = [];
        const values: any[] = [];
        let index = 1;

        if (options.where) {
            for (const [key, value] of Object.entries(options.where)) {
                whereClauses.push(`${key} = $${index}`);
                values.push(value);
                index++;
            }
        }

        if (whereClauses.length > 0) {
            query += " WHERE " + whereClauses.join(" AND ");
        }

        if (options.orderBy) {
            query += " ORDER BY " + options.orderBy;
        }

        if (options.limit) {
            query += " LIMIT " + options.limit;
        }

        if (options.offset) {
            query += " OFFSET " + options.offset;
        }

        const result = await this.client.queryObject<ClientEntity>(query, ...values);
        return result.rows;
    }
}
