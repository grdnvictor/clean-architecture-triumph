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
const passwordService = new PasswordService();
const tokenService = new TokenService();

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

    // Gérer les requêtes préflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: new Headers({
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        }),
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
        console.log("response", response);
      } else {
        response = new Response("Method not allowed", { status: 405 });
      }
    } else {
      response = new Response("Not found", { status: 404 });
    }

    // Cloner la réponse et ajouter les headers CORS avant de la renvoyer
    const corsHeaders = new Headers(response.headers);
    corsHeaders.set("Access-Control-Allow-Origin", "http://localhost:3000");
    corsHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    corsHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    corsHeaders.set("Access-Control-Allow-Credentials", "true");

    return new Response(response.body, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(message, { status: 500 });
  }
};

Deno.serve(options, handler);

console.log(`Server running on http://${options.host}:${options.port}`);