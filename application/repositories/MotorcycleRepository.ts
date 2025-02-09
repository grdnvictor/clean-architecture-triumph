import type { MotorcycleEntity } from "../../domain/entities/MotorcycleEntity.ts";

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[]>;
  findByOption(options: {
    where?: Record<string, any>;
    select?: string[];
    orderBy?: string;
    limit?: number;
    offset?: number;
  }): Promise<MotorcycleEntity[]>;
  findOneById(id: string): Promise<MotorcycleEntity | null>;
  update(id: string, updatedData: Partial<MotorcycleEntity>): Promise<void>;
  delete(id: string): Promise<void>;

}
