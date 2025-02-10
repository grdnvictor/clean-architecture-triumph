import type { TrialEntity } from "../../domain/entities/TrialEntity.ts";

export interface TrialRepository {
    save(client: TrialEntity ): Promise<void>;
    all(consessionId: string): Promise<TrialEntity[]>;
    findByOption(options: {
        where?: Record<string, any>;
        select?: string[];
        orderBy?: string;
        limit?: number;
        offset?: number;
    }): Promise<TrialEntity[]>;
    findOneById(id: string): Promise<TrialEntity | null>;
    update(id: string, updatedData: Partial<TrialEntity>): Promise<void>;
    delete(id: string): Promise<void>;
}
