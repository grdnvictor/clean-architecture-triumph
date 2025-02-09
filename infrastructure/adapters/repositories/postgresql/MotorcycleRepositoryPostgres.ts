import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository.ts";
import type { MotorcycleEntity } from "../../../../domain/entities/MotorcycleEntity.ts";
import { DatabaseConnection } from "../../connection.ts";

export class MotorcycleRepositoryPostgres implements MotorcycleRepository {
  private client: Client;

  constructor() {
    this.client = DatabaseConnection.getInstance().getClient();
  }

  public async save(motorcycle: MotorcycleEntity): Promise<void> {

    await this.client.queryArray(
        `INSERT INTO motorcycle (id, vin, modelId, concessionId, currentMileage, createdAt, updatedAt) 
        VALUES ($IDENTIFIER, $VIN, $MODELID, $CONCESSIONID, $CURRENTMILEAGE, $CREATED_AT, $UPDATED_AT)`,
        {
            IDENTIFIER: motorcycle.identifier,
            VIN: motorcycle.vin,
            MODELID: motorcycle.modelId,
            CONCESSIONID: motorcycle.concessionId,
            CURRENTMILEAGE: motorcycle.currentMileage,
            CREATED_AT: new Date(),
            UPDATED_AT: new Date()
        }
    );
  }

  public async all(): Promise<MotorcycleEntity[]> {
    const result = await this.client.queryObject<MotorcycleEntity>("SELECT * FROM motorcycle");
    return result.rows;
  }

  public async findOneById(id: string): Promise<MotorcycleEntity | null> {
      const result = await this.client.queryObject<MotorcycleEntity>(
          "SELECT * FROM motorcycle WHERE id = $ID",
          { ID: id }
      );
      return result.rows.length > 0 ? result.rows[0] : null;
  }


    public async update(id: string, updatedData: Partial<MotorcycleEntity>): Promise<void> {
        await this.client.queryArray(
            "UPDATE motorcycle SET currentMileage = COALESCE($CURRENTMILEAGE, currentMileage), updatedAt = NOW() WHERE id = $ID",
            {
                ID: id,
                CURRENTMILEAGE: updatedData.currentMileage
            }
        );
    }


  public async delete(id: string): Promise<void> {
      await this.client.queryArray("DELETE FROM motorcycle WHERE id = $ID", {
          ID: id
      });
  }

  public async getMotorcycleById(id: string): Promise<MotorcycleEntity | null> {
        const result = await this.client.queryObject<MotorcycleEntity>(
            "SELECT * FROM motorcycle WHERE id = $ID",
            { ID: id }
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }
}
