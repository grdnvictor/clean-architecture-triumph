import type { ClientEntity } from "../../domain/entities/ClientEntity.ts";

export interface ClientRepository {
    save(client: ClientEntity ): Promise<void>;
    all(): Promise<ClientEntity[]>;
    findByOption(options: {
        where?: Record<string, any>;
        select?: string[];
        orderBy?: string;
        limit?: number;
        offset?: number;
    }): Promise<ClientEntity[]>;
    findOneById(id: string): Promise<ClientEntity | null>;
    findOneByPhone(phone: string): Promise<ClientEntity | null>;
    update(id: string, updatedData: Partial<ClientEntity>): Promise<void>;
    delete(id: string): Promise<void>;
}
