export class ScheduleController {
    public constructor(private readonly scheduleRepository: ScheduleRepository) {}

    public async create(request: ScheduleCreateRequest): Promise<void> {
        const schedule = new ScheduleEntity(request.id, request.date, request.motorcycleId, request.maintenanceType);

        await this.scheduleRepository.save(schedule);
    }
}