import { MaintenanceScheduleRepository } from "../../repositories/MaintenanceScheduleRepository.ts";
import {IntervalEntity} from "../../../domain/entities/IntervalEntity.ts";

export class CreateMaintenanceUsecase {
    constructor(maintenanceScheduleRepository: MaintenanceScheduleRepository) {}
    async execute(input: {
        identifier: string,
        motorcycleId: string,
        maintenanceId: string,
        distanceInterval: number,
        timeInterval: number,
    }): Promise<IntervalEntity> {
        const schedule =  IntervalEntity.create(
            input.motorcycleId,
            input.maintenanceId,
            input.distanceInterval,
            input.timeInterval,
        );
        return this.maintenanceScheduleRepository.save(schedule);
    }
}