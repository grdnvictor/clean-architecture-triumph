import type { MotorcycleEntity } from "../../domain/entities/MotorcycleEntity.ts";

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[]>;
  findOneById(id: string): Promise<MotorcycleEntity | null>;
  findOneByClientId(id: string): Promise<MotorcycleEntity | null>;
  existsInConcession(id: string, concessionId: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}
