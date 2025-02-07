import { AppointmentRepositoryInMemory } from "../../adapters/repositories/AppointmentRepositoryInMemory";
import { MotorcycleRepositoryPostgres } from "../../adapters/repositories/MotorcycleRepositoryPostgres";
import { AppointmentController } from "./controllers/AppointmentController";
import { MotorcycleController } from "./controllers/MotorcycleController";
import {AuthentificationController} from "./controllers/AuthentificationController";
import { UserRepositoryInMemory } from "../../adapters/repositories/UserRepositoryInMemory";
import {AuthentificationUsecase} from "../../../application/usecases/AuthentificationUsecase";
import {TokenService} from "../../services/TokenService";
import {PasswordService} from "../../services/PasswordService";
import * as process from "node:process";

const options = {
  port: 8000,
  host: "0.0.0.0",
};

const appointmentRepository = new AppointmentRepositoryInMemory([]);
const motorcycleRepository = new MotorcycleRepositoryPostgres([]);
const userRepository = new UserRepositoryInMemory();
const passwordService = new PasswordService();
const tokenService = new TokenService(process.env.JWT_SECRET);

const appointmentController = new AppointmentController(
  appointmentRepository,
  motorcycleRepository,
);

const authentificationUsecase = new AuthentificationUsecase(
  userRepository,
  passwordService,
  tokenService
);

const authentificationController = new AuthentificationController(
  authentificationUsecase
);

const motorcycleController = new MotorcycleController(motorcycleRepository);

const handler = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);
    const options = {
        headers: {
            "Access-Control-Allow-Origin": Deno.env.get("FRONTEND_URL"),
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
    }
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: new Headers(options.headers),
      });
    }
    let response: Response;

    if (url.pathname === "/appointments") {
      if (request.method === "GET") {
        response = await appointmentController.listAppointments();
      } else if (request.method === "POST") {
        response = await appointmentController.createAppointment(request);
      } else {
        response = new Response("Method not allowed", { status: 405 });
      }
    } else if (url.pathname === "/motorcycles") {
      if (request.method === "GET") {
        response = await motorcycleController.listMotorcycles(request);
      } else if (request.method === "POST") {
        response = await motorcycleController.createMotorcycle(request);
      } else {
        response = new Response("Method not allowed", { status: 405 });
      }
    } else if (url.pathname === "/auth/signin") {
      if (request.method === "POST") {
        response = await authentificationController.login(request);
      } else {
        response = new Response("Method not allowed", { status: 405 });
      }
    } else {
      response = new Response("Not found", { status: 404 });
    }

    return new Response(response.body, {
      status: response.status,
      headers:  new Headers(options.headers),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(message, { status: 500, headers: { "Access-Control-Allow-Origin": process.env.FRONTEND_URL } });
  }
};
Deno.serve(options, handler);

console.log(`Server running on http://${options.host}:${options.port}`);