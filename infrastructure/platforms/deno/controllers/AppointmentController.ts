import type { AppointmentRepository } from "../../../../application/repositories/AppointmentRepository.ts";
import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository.ts";
import { ListAppointmentsUsecase } from "../../../../application/usecases/appointment/ListAppointmentsUsecase.ts";
import { exhaustive } from "npm:exhaustive";
import { createAppointmentRequestSchema } from "../schemas/createAppointmentRequestSchema.ts";
import {CreateAppointmentUsecase} from "../../../../application/usecases/appointment/CreateAppointmentUsecase.ts";
import {ClientRepository} from "../../../../application/repositories/ClientRepository.ts";
import {ClientMotorcycleRepository} from "../../../../application/repositories/ClientMotorcycleRepository.ts";
import {deleteClientRequestSchema} from "../schemas/client/index.ts";
import {DeleteClientUsecase} from "../../../../application/usecases/client/index.ts";
import {DeleteAppointmentUsecase} from "../../../../application/usecases/appointment/DeleteAppointmentUsecase.ts";

export class AppointmentController {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly clientMotorcycleRepository: ClientMotorcycleRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  public async listAppointments(): Promise<Response> {
    const listAppointmentsUsecase = new ListAppointmentsUsecase(
      this.appointmentRepository,
    );

    const appointments = await listAppointmentsUsecase.execute();

    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async createAppointment(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createAppointmentRequestSchema.safeParse(body);
    if (!validation.success) {
      return new Response("Malformed request", {
        status: 400,
      });
    }

    const { date, clientId ,motorcycleId } = validation.data;
    const createAppointmentUsecase = new CreateAppointmentUsecase(
        this.appointmentRepository,
        this.clientMotorcycleRepository,
        this.clientRepository,
    );

    const error = await createAppointmentUsecase.execute(date, clientId, motorcycleId);

    if (!error) {
      return new Response(null, {
        status: 201,
      });
    }

    return exhaustive(error.name, {
      AppointmentDatePastError: () => new Response("AppointmentDatePastError", { status: 400 }),
      MotorcycleNotFoundError: () => new Response("MotorcycleNotFoundError", { status: 400 }),
      UserNotFoundError: () => new Response("UserNotFoundError", { status: 400 }),
    });
  }

  public async deleteAppointment(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    console.log(url)
    if (!id) return new Response("Missing ID", { status: 400 });
    console.log(id);
    const validation = deleteClientRequestSchema.safeParse({ id });
    if (!validation.success) {
      return new Response("Invalid ID format", {
        status: 400
      });
    }

    const deleteAppointement = new DeleteAppointmentUsecase(this.appointmentRepository);
    await deleteAppointement.execute(id);
    return new Response(null, {
      status: 200
    });

  }

}
