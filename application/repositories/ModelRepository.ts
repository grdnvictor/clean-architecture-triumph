import type {ModelEntity} from "../../domain/entities/ModelEntity";

export interface ModelRepository {
    save(motorcycle: ModelEntity): Promise<void>;
    all(): Promise<ModelEntity[]>;
    findOneById(id: string): Promise<ModelEntity | null>;
}