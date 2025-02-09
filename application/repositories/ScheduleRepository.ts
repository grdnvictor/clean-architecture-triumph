export interface ScheduleRepository {
    save(schedule: ScheduleEntity): Promise<void>;
    all(): Promise<ScheduleEntity[]>;
    findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<ScheduleEntity[]>;
}