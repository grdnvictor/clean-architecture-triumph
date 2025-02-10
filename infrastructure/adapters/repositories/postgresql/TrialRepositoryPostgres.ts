import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { TrialEntity } from "../../../../domain/entities/TrialEntity.ts";
import { DatabaseConnection } from "../../connection.ts";
import { TrialRepository } from "../../../../application/repositories/TrialRepository.ts";

export class TrialRepositoryPostgres implements TrialRepository {
    private client: Client;

    constructor() {
        this.client = DatabaseConnection.getInstance().getClient();
    }

    public async save(trial: TrialEntity): Promise<void> {
        await this.client.queryArray(
            `INSERT INTO trial (id, clientId, motorcycleId, concessionId, startDate, endDate, mileageStart, mileageEnd, feedback, createdAt, updatedAt)
             VALUES ($ID, $CLIENT_ID, $MOTORCYCLE_ID, $CONCESSION_ID, $START_DATE, $END_DATE, $MILEAGE_START, $MILEAGE_END, $FEEDBACK, $CREATED_AT, $UPDATED_AT)`,
            {
                ID: trial.identifier,
                CLIENT_ID: trial.clientId,
                MOTORCYCLE_ID: trial.motorcycleId,
                CONCESSION_ID: trial.concessionId,
                START_DATE: trial.startDate,
                END_DATE: trial.endDate,
                MILEAGE_START: trial.mileageStart,
                MILEAGE_END: trial.mileageEnd,
                FEEDBACK: trial.feedback,
                CREATED_AT: trial.createdAt,
                UPDATED_AT: trial.updatedAt
            }
        );
    }

    public async all(concessionId: string): Promise<TrialEntity[]> {
        const result = await this.client.queryObject<TrialEntity>(
            "SELECT * FROM trial WHERE concessionId = $CONCESSION_ID",
            { CONCESSION_ID: concessionId }
        );
        return result.rows;
    }

    public async findOneById(id: string): Promise<TrialEntity | null> {
        const result = await this.client.queryObject<TrialEntity>(
            "SELECT * FROM trial WHERE id = $ID",
            { ID: id }
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async update(id: string, updatedData: Partial<TrialEntity>): Promise<void> {
        await this.client.queryArray(
            `UPDATE trial 
             SET clientId = COALESCE($CLIENT_ID, clientId), 
                 motorcycleId = COALESCE($MOTORCYCLE_ID, motorcycleId), 
                 concessionId = COALESCE($CONCESSION_ID, concessionId), 
                 startDate = COALESCE($START_DATE, startDate), 
                 endDate = COALESCE($END_DATE, endDate), 
                 mileageStart = COALESCE($MILEAGE_START, mileageStart), 
                 mileageEnd = COALESCE($MILEAGE_END, mileageEnd), 
                 feedback = COALESCE($FEEDBACK, feedback), 
                 updatedAt = NOW() 
             WHERE id = $ID`,
            {
                ID: id,
                CLIENT_ID: updatedData.clientId,
                MOTORCYCLE_ID: updatedData.motorcycleId,
                CONCESSION_ID: updatedData.concessionId,
                START_DATE: updatedData.startDate,
                END_DATE: updatedData.endDate,
                MILEAGE_START: updatedData.mileageStart,
                MILEAGE_END: updatedData.mileageEnd,
                FEEDBACK: updatedData.feedback
            }
        );
    }

    public async delete(id: string): Promise<void> {
        await this.client.queryArray("DELETE FROM trial WHERE id = $ID", { ID: id });
    }

    public async findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<TrialEntity[]> {
        let query = "SELECT ";

        if (options.select && options.select.length > 0) {
            query += options.select.join(", ");
        } else {
            query += "*";
        }

        query += " FROM trial";

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

        const result = await this.client.queryObject<TrialEntity>(query, ...values);
        return result.rows;
    }
}