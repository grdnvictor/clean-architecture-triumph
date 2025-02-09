import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { ConcessionEntity } from "../../../../domain/entities/ConcessionEntity.ts";
import { DatabaseConnection } from "../../connection.ts";
import { ConcessionRepository } from "../../../../application/repositories/ConcessionRepository.ts";

export class ConcessionRepositoryPostgres implements ConcessionRepository {
    private client: Client;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
    }

    public async save(concession: ConcessionEntity): Promise<void> {
        await this.client.queryArray(
            `INSERT INTO concession (id, name, phoneNumber, siret, address, createdAt, updatedAt)
       VALUES ($IDENTIFIER, $NAME, $PHONE_NUMBER, $SIRET, $ADDRESS, $CREATED_AT, $UPDATED_AT)`,
            {
                IDENTIFIER: concession.identifier,
                NAME: concession.name,
                PHONE_NUMBER: concession.phoneNumber,
                SIRET: concession.siret,
                ADDRESS: concession.address,
                CREATED_AT: concession.createdAt,
                UPDATED_AT: concession.updatedAt
            }
        );
    }

    public async all(): Promise<ConcessionEntity[]> {
        const result = await this.client.queryObject<ConcessionEntity>("SELECT * FROM concession");
        return result.rows;
    }

    public async findOneById(id: string): Promise<ConcessionEntity | null> {
        const result = await this.client.queryObject<ConcessionEntity>(
            "SELECT * FROM concession WHERE id = $ID",
            { ID: id }
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async update(id: string, updatedData: Partial<ConcessionEntity>): Promise<void> {
        await this.client.queryArray(
            `UPDATE concession 
       SET name = COALESCE($NAME, name), 
           phoneNumber = COALESCE($PHONE_NUMBER, phoneNumber), 
           siret = COALESCE($SIRET, siret), 
           address = COALESCE($ADDRESS, address), 
           updatedAt = NOW() 
       WHERE id = $ID`,
            {
                ID: id,
                NAME: updatedData.name,
                PHONE_NUMBER: updatedData.phoneNumber,
                SIRET: updatedData.siret,
                ADDRESS: updatedData.address
            }
        );
    }

    public async delete(id: string): Promise<void> {
        await this.client.queryArray("DELETE FROM concession WHERE id = $ID", { ID: id });
    }

    public async findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<ConcessionEntity[]> {
        let query = "SELECT ";

        if (options.select && options.select.length > 0) {
            query += options.select.join(", ");
        } else {
            query += "*";
        }

        query += " FROM concession";

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

        const result = await this.client.queryObject<ConcessionEntity>(query, ...values);
        return result.rows;
    }
}