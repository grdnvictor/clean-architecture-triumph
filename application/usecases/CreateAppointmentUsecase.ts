import { AppointmentEntity } from "../../domain/entities/AppointmentEntity.ts";
import { MotorcycleNotFoundError } from "../../domain/errors/MotorcycleNotFoundError.ts";
import { AppointmentDate } from "../../domain/types/AppointmentDate.ts";
import type { AppointmentRepository } from "../repositories/AppointmentRepository.ts";
import type { MotorcycleRepository } from "../repositories/MotorcycleRepository.ts";
import {ClientRepository} from "../repositories/ClientRepository.ts";
import {ClientEntity} from "../../domain/entities/ClientEntity.ts";
import {UserNotFoundError} from "../../domain/errors/UserNotFoundError.ts";

export class CreateAppointmentUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  public async execute(date: Date, clientId:string, motorcycleId: string) {
    const motorcycle = await this.motorcycleRepository.findOneById(
      motorcycleId,
    );

    if (!motorcycle) {
      return new MotorcycleNotFoundError();
    }

    const client = await this.clientRepository.findOneById(
        clientId,
    );

    if (!client) {
        return new UserNotFoundError();
    }

    const appointmentDateOrError = AppointmentDate.from(date);

    if (appointmentDateOrError instanceof Error) {
      return appointmentDateOrError;
    }

    const appointment = AppointmentEntity.create(
        appointmentDateOrError,
        client,
        motorcycle,
    );

    await this.appointmentRepository.save(appointment);
  }
}
