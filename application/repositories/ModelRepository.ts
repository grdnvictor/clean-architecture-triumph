import type {ModelEntity} from "../../domain/entities/ModelEntity";

export interface ModelRepository {
    save(motorcycle: ModelEntity): Promise<void>;
    all(): Promise<ModelEntity[]>;
    findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<ModelEntity[]>;
}