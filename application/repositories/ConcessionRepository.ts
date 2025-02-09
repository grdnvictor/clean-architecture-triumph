import type { ConcessionEntity } from "../../domain/entities/ConcessionEntity.ts";

export interface ConcessionRepository {
    save(client: ConcessionEntity ): Promise<void>;
    all(): Promise<ConcessionEntity[]>;
    findByOption(options: {
        where?: Record<string, any>;
        select?: string[];
        orderBy?: string;
        limit?: number;
        offset?: number;
    }): Promise<ConcessionEntity[]>;
    findOneById(id: string): Promise<ConcessionEntity | null>;
    update(id: string, updatedData: Partial<ConcessionEntity>): Promise<void>;
    delete(id: string): Promise<void>;
}
