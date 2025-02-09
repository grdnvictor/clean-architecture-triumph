import type { MaintenanceEntity } from "../../domain/entities/MaintenanceEntity.ts";

export interface MaintenanceRepository {
    save(maintenance: MaintenanceEntity): Promise<MaintenanceEntity>;
    findByMotorcycleId(motorcycleId: string): Promise<MaintenanceEntity[]>;
    getLastMaintenance(motorcycleId: string): Promise<MaintenanceEntity | null>;
    update(maintenance: MaintenanceEntity): Promise<MaintenanceEntity>;
}