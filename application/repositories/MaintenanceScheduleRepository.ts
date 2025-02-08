import type { IntervalEntity} from "../../domain/entities/IntervalEntity";

export interface MaintenanceScheduleRepository {
    save(schedule: IntervalEntity): Promise<IntervalEntity>;
    findByModelId(modelId: string): Promise<IntervalEntity>;
    update(schedule: IntervalEntity): Promise<IntervalEntity>;
    delete(id: string): Promise<void>;
}