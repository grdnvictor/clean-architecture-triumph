import { AppointmentRepositoryInMemory } from "../../adapters/repositories/AppointmentRepositoryInMemory.ts";
import { MotorcycleRepositoryInMemory } from "../../adapters/repositories/MotorcycleRepositoryInMemory.ts";
import { AppointmentController } from "./controllers/AppointmentController.ts";
import { MotorcycleController } from "./controllers/MotorcycleController.ts";
import {AuthentificationController} from "./controllers/AuthentificationController";
import { UserRepositoryInMemory } from "../../adapters/repositories/UserRepositoryInMemory.ts";

const options = {
  port: 8000,
  host: "0.0.0.0",
};

const appointmentRepository = new AppointmentRepositoryInMemory([]);
const motorcycleRepository = new MotorcycleRepositoryInMemory([]);
const userRepository = new UserRepositoryInMemory([]);

const appointmentController = new AppointmentController(
  appointmentRepository,
  motorcycleRepository,
);

const authentificationController = new AuthentificationController(
    userRepository
);

const motorcycleController = new MotorcycleController(motorcycleRepository);

const handler = (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    if (url.pathname === "/appointments") {
      if (request.method === "GET") {
        return appointmentController.listAppointments();
      }

      if (request.method === "POST") {
        return appointmentController.createAppointment(request);
      }
    }

    if (url.pathname === "/motorcycles") {
      if (request.method === "GET") {
        return motorcycleController.listMotorcycles(request);
      }

      if (request.method === "POST") {
        return motorcycleController.createMotorcycle(request);
      }
    }

    if(url.pathname === "/auth/signin"){
        if (request.method === "POST") {
            return authentificationController.login(request);
        }
    }

    return Promise.resolve(
      new Response("Not found", {
        status: 404,
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return Promise.resolve(
      new Response(message, {
        status: 500,
      }),
    );
  }
};

Deno.serve(options, handler);
