import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import type { MotorcycleRepository } from "../../../application/repositories/MotorcycleRepository.ts";
import type { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity.ts";
import { DatabaseConnection } from "../connection";

export class MotorcycleRepositoryPostgres implements MotorcycleRepository {
  private client: Client;

  constructor() {
    this.client = DatabaseConnection.getInstance().getClient();
  }

  public async save(motorcycle: MotorcycleEntity): Promise<void> {
    await this.client.queryArray(
        "INSERT INTO motorcycle (id, vin, modelId, concessionId, currentMileage, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        motorcycle.identifier,
        motorcycle.vin,
        motorcycle.modelId,
        motorcycle.concessionId,
        motorcycle.currentMileage,
        motorcycle.createdAt,
        motorcycle.updatedAt
    );
  }

  public async all(): Promise<MotorcycleEntity[]> {
    const result = await this.client.queryObject<MotorcycleEntity>("SELECT * FROM motorcycle");
    return result.rows;
  }

  public async findOneById(id: string): Promise<MotorcycleEntity | null> {
    const result = await this.client.queryObject<MotorcycleEntity>(
        "SELECT * FROM motorcycle WHERE id = $1",
        id
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async update(id: string, updatedData: Partial<MotorcycleEntity>): Promise<void> {
    await this.client.queryArray(
        "UPDATE motorcycle SET vin = COALESCE($2, vin), modelId = COALESCE($3, modelId), concessionId = COALESCE($4, concessionId), currentMileage = COALESCE($5, currentMileage), updatedAt = NOW() WHERE id = $1",
        id,
        updatedData.vin,
        updatedData.modelId,
        updatedData.concessionId,
        updatedData.currentMileage
    );
  }

  public async delete(id: string): Promise<void> {
    await this.client.queryArray("DELETE FROM motorcycle WHERE id = $1", id);
  }

  public async getMotorcycleById(id: string): Promise<MotorcycleEntity | null> {
    const result = await this.client.queryObject<MotorcycleEntity>(
        "SELECT * FROM motorcycle WHERE id = $1",
        id
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}
