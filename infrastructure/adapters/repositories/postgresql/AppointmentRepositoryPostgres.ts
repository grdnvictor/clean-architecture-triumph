import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import type { AppointmentRepository } from "../../../../application/repositories/AppointmentRepository.ts";
import type { AppointmentEntity } from "../../../../domain/entities/AppointmentEntity.ts";
import {DatabaseConnection} from "../../connection.ts";

export class AppointmentRepositoryPostgres implements AppointmentRepository {
  private client: Client;
  private tableName: string;

  constructor() {
    this.client = DatabaseConnection.getInstance().getClient();
    this.tableName = "appointment";
  }
  public async save(appointment: AppointmentEntity): Promise<void> {
    console.log("Appointement",appointment);
    console.log("motoID",appointment.motorcycle.id)
    return await this.client.queryObject<AppointmentEntity>(
        `INSERT INTO ${this.tableName} (date, client_id, motorcycle_id) 
        VALUES ($DATE, $CLIENT_ID, $MOTORCYCLE_ID)`,
        {
          DATE: appointment.date.value,
          CLIENT_ID: appointment.client.id,
          MOTORCYCLE_ID: appointment.motorcycle.id,
        }
    );

  }

  public all(): Promise<AppointmentEntity[]> {
    return Promise.resolve(this.appointments);
  }
}
