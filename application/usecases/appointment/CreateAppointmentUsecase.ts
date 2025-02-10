import {AppointmentRepository} from "../../repositories/AppointmentRepository.ts";
import {MotorcycleRepository} from "../../repositories/MotorcycleRepository.ts";
import {ClientRepository} from "../../repositories/ClientRepository.ts";
import {MotorcycleNotFoundError} from "../../../domain/errors/MotorcycleNotFoundError.ts";
import {UserNotFoundError} from "../../../domain/errors/UserNotFoundError.ts";
import {AppointmentDate} from "../../../domain/types/AppointmentDate.ts";
import {AppointmentEntity} from "../../../domain/entities/AppointmentEntity.ts";
import {ClientMotorcycleRepository} from "../../repositories/ClientMotorcycleRepository.ts";

export class CreateAppointmentUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly clientMotorcycleRepository: ClientMotorcycleRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  public async execute(date: Date, clientId:string, motorcycleId: string) {

    const clientMotorcycle = await this.clientMotorcycleRepository.findOneById(
      motorcycleId,
    );

    if (!clientMotorcycle) {
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
        clientMotorcycle,
    );
    await this.appointmentRepository.save(appointment);
  }
}
