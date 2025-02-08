import type {ModelEntity} from "../../domain/entities/ModelEntity.ts";

export interface ModelRepository {
   // save(motorcycle: ModelEntity): Promise<void>;
    all(): Promise<ModelEntity[]>;
}