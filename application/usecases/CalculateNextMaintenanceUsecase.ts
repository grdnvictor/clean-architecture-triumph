import {MaintenanceEntity, MaintenanceStatus} from "../../domain/entities/MaintenanceEntity";
import {MaintenanceRepository} from "../repositories/MaintenanceRepository";
import {MotorcycleRepository} from "../repositories/MotorcycleRepository";
import {IntervalEntity} from "../../domain/entities/IntervalEntity";

export class CalculateNextMaintenance {
    constructor(
        private maintenanceRepository: MaintenanceRepository,
        private motorcycleRepository: MotorcycleRepository
    ) {}

    async execute(motorcycleId: string, technicianNotes:string): Promise<MaintenanceEntity> {
        const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
        const schedule = await this.maintenanceRepository.findByModelId(motorcycle.modelId);

        const lastMaintenance = await this.getLastMaintenance(motorcycleId);
        const nextDueDate = this.calculateNextDueDate(lastMaintenance, schedule);
        const nextDueKilometers = this.calculateNextDueKilometers(lastMaintenance, schedule);

        return MaintenanceEntity.create(
            motorcycle,
            schedule.id,
            nextDueDate,
            nextDueKilometers,
            technicianNotes,
            MaintenanceStatus.PENDING,
        );
    }


    private calculateNextDueDate(lastMaintenance: MaintenanceEntity, schedule: IntervalEntity): Date {
        const baseDate = lastMaintenance ? lastMaintenance.dueDate : new Date();
        return new Date(baseDate.setMonth(baseDate.getMonth() + schedule.timeInterval));
    }

    private calculateNextDueKilometers(lastMaintenance: MaintenanceEntity, schedule: IntervalEntity): number {
        return (lastMaintenance ? lastMaintenance.mileage : 0) + schedule.distanceInterval;
    }
}