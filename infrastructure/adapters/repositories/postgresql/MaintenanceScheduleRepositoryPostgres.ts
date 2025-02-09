import {DatabaseConnection} from "../../connection.ts";
import {MaintenanceScheduleRepository} from "../../../../application/repositories/MaintenanceScheduleRepository.ts";
import {IntervalEntity} from "../../../../domain/entities/IntervalEntity.ts";

export class MaintenanceScheduleRepositoryPostgres implements MaintenanceScheduleRepository {
    private dbConnection: DatabaseConnection;
    private tableName: string;

    constructor() {
        this.dbConnection = DatabaseConnection.getInstance();
        this.tableName = "users";
    }

    async save(schedule: IntervalEntity): Promise<IntervalEntity> {
        const client = this.dbConnection.getClient();
        const query = `
            INSERT INTO maintenance_schedules (
                id, motorcycle_id,maintenance_id, distance_interval, 
                time_interval
            ) VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const result = await client.queryObject(query, [
            schedule.identifier,
            schedule.motorcycleId,
            schedule.maintenanceId,
            schedule.distanceInterval,
            schedule.timeInterval
        ]);
        const row = result.rows[0];
        console.log(row);

        return IntervalEntity.create(row.identifier, row.motorcycle_id, row.maintenance_id, row.distance_interval);
    }


}

