import type { AppointmentDate } from "../types/AppointmentDate.ts";
import type { MotorcycleEntity } from "./MotorcycleEntity.ts";
import {ClientEntity} from "./ClientEntity.ts";

export class AppointmentEntity {
  private constructor(
    public readonly identifier: string,
    public readonly date: AppointmentDate,
    public readonly client: ClientEntity,
    public readonly motorcycle: MotorcycleEntity,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(date: AppointmentDate,client:ClientEntity, motorcycle: MotorcycleEntity) {
    const identifier = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new AppointmentEntity(
      identifier,
      date,
      client,
      motorcycle,
      createdAt,
      updatedAt,
    );
  }
}
