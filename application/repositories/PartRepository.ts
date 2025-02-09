import type { PartEntity } from "../../domain/entities/PartEntity";

export interface PartRepository {
    save(part: PartEntity ): Promise<void>;
    all(): Promise<PartEntity[]>;
    findByOption(options: {
        where?: Record<string, any>;
        select?: string[];
        orderBy?: string;
        limit?: number;
        offset?: number;
    }): Promise<PartEntity[]>;
    findOneById(id: string): Promise<PartEntity | null>;
    update(id: string, updatedData: Partial<PartEntity>): Promise<void>;
    delete(id: string): Promise<void>;
}
