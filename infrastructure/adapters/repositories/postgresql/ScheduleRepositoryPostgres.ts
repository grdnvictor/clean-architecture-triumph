import { ScheduleRepository } from "../../../../application/repositories/ScheduleRepository.ts";

export class ScheduleRepositoryPostgres implements ScheduleRepository {
    public async save(schedule: ScheduleEntity): Promise<void> {
        const client = new Client();
        await client.connect();
        try {
            await client.queryObject<ScheduleEntity>(`
                INSERT INTO schedule (id, date, motorcycle_id, maintenance_type)
                VALUES ('${schedule.identifier}', '${schedule.date}', '${schedule.motorcycleId}',
                        '${schedule.maintenanceType}')
            `);
        } catch (error) {
            console.error(`Error in save for schedule:`, error);
        } finally {
            await client.end();
        }

    }
}