import { Part } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { DatabaseConnection } from "../../connection";
import { PartRepository } from "../../../../application/repositories/PartRepository";
import { PartEntity } from "../../../../domain/entities/PartEntity";
import {ClientEntity} from "../../../../domain/entities/ClientEntity";

export class PartRepositoryPostgres implements PartRepository {
    private client: Part;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
    }

    public async save(part: PartEntity): Promise<void> {
        await this.client.queryArray(
            `INSERT INTO part (id, name, reference, stock, minimumStock, createdAt, updatedAt)
            VALUES ($IDENTIFIER, $NAME, $REFERENCE, $STOCK, $MINIMUM_STOCK, $CREATED_AT, $UPDATED_AT)`,
            {
                IDENTIFIER: part.identifier,
                NAME: part.name,
                REFERENCE: part.reference,
                STOCK: part.stock,
                MINIMUM_STOCK: part.minimumStock,
                CREATED_AT: new Date(),
                UPDATED_AT: new Date()
            }
        );
    }

    public async all(): Promise<PartEntity[]> {
        const result = await this.client.queryObject<PartEntity>("SELECT * FROM part");
        return result.rows;
    }

    public async findOneById(id: string): Promise<PartEntity | null> {
        const result = await this.client.queryObject<PartEntity>(
            "SELECT * FROM part WHERE id = $ID",
            { ID: id }
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async update(id: string, updatedData: Partial<PartEntity>): Promise<void> {
        await this.client.queryArray(
            `UPDATE part 
     SET stock = COALESCE($STOCK, stock), 
         minimumStock = COALESCE($MINIMUMSTOCK, minimumStock), 
         name = COALESCE($NAME, name), 
         reference = COALESCE($REFERENCE, reference), 
         updatedAt = NOW() 
     WHERE id = $ID`,
            {
                ID: id,
                NAME: updatedData.name ?? null,
                REFERENCE: updatedData.reference ?? null,
                STOCK: updatedData.stock ?? null,
                MINIMUMSTOCK: updatedData.minimumStock ?? null
            }
        );
    }


    public async delete(id: string): Promise<void> {
        await this.client.queryArray("DELETE FROM part WHERE id = $PART", { PART: id });
    }

    public async findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<PartEntity[]> {
        let query = "SELECT ";

        if (options.select && options.select.length > 0) {
            query += options.select.join(", ");
        } else {
            query += "*";
        }

        query += " FROM part";

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

        const result = await this.client.queryObject<PartEntity>(query, ...values);
        return result.rows;
    }
}
