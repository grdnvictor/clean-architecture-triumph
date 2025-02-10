import type {ClientMotorcycleEntity} from "../../domain/entities/ClientMotorcycleEntity.ts";

export interface ClientMotorcycleRepository {
    findOneByClientId(id: string): Promise<ClientMotorcycleEntity | null>;
    findOneById(id: string): Promise<ClientMotorcycleEntity | null>;
}