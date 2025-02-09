import * as process from "node:process";

import { AppointmentRepositoryInMemory } from "../../adapters/repositories/inMemory/AppointmentRepositoryInMemory";
import {AuthentificationUsecase} from "../../../application/usecases/AuthentificationUsecase";
import {TokenService} from "../../services/TokenService";
import {PasswordService} from "../../services/PasswordService";

import {
    ClientController,
    AppointmentController,
    MotorcycleController,
    AuthentificationController,
    MotorcycleBrandController,
    MotorcycleModelController,
    ConcessionController
} from "./controllers/index.ts";

import {
    ConcessionRepositoryPostgres,
    MotorcycleRepositoryPostgres,
    UserRepositoryPostgres,
    BrandRepositoryPostgres,
    ModelRepositoryPostgres,
    ClientRepositoryPostgres
} from "../../adapters/repositories/postgresql/index.ts";


const options = {
  port: 8000,
  host: "0.0.0.0",
};

const appointmentRepository = new AppointmentRepositoryInMemory([]);
const userRepository = new UserRepositoryPostgres();
const motorcycleRepository = new MotorcycleRepositoryPostgres([]);

const clientRepositoryPostgres = new ClientRepositoryPostgres();
const clientController = new ClientController(clientRepositoryPostgres);

const concessionRepositoryPostgres = new ConcessionRepositoryPostgres();
const concessionController = new ConcessionController(concessionRepositoryPostgres);

const passwordService = new PasswordService();
const tokenService = new TokenService(process.env.JWT_SECRET);
const brandRepository = new BrandRepositoryPostgres();
const modelRepository = new ModelRepositoryPostgres();

const appointmentController = new AppointmentController(
  appointmentRepository,
  motorcycleRepository,
);

const authentificationUsecase = new AuthentificationUsecase(
  userRepository,
  passwordService,
  tokenService
);

const authentificationController = new AuthentificationController(authentificationUsecase);

const motorcycleController = new MotorcycleController(
    motorcycleRepository,
    brandRepository,
    modelRepository
);

const motorcycleBrandController = new MotorcycleBrandController(brandRepository);
const motorcycleModelController = new MotorcycleModelController(modelRepository);

const handler = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);
    const options = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
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
    }

    if (url.pathname === "/motorcycles") {
      if (request.method === "GET") {
        response = await motorcycleController.listMotorcycles(request);
      } else if (request.method === "POST") {
        response = await motorcycleController.createMotorcycle(request);
      } else {
        response = new Response("Method not allowed", { status: 405 });
      }
    }

    if (url.pathname.startsWith("/clients")) {
      const hasParameter = url.pathname.split("/").length > 2;
      if (request.method === "GET") {
        response = hasParameter
            ? await clientController.getClientById(request)
            : await clientController.listClients(request);
      }

      if (request.method === "POST") {
        response = await clientController.createClient(request);
      }

      if (request.method === "PUT") {
        response = await clientController.updateClient(request);
      }

      if (request.method === "DELETE") {
        response = await clientController.deleteClient(request);
      }
    }

    if (url.pathname.startsWith("/concessions")) {
        const hasParameter = url.pathname.split("/").length > 2;
        if (request.method === "GET") {
            response = hasParameter
                ? await concessionController.getConcessionById(request)
                : await concessionController.listConcessions();
        }

        if (request.method === "POST") {
            response = await concessionController.createConcession(request);
        }

        if (request.method === "PUT") {
            response = await concessionController.updateConcession(request);
        }

        if (request.method === "DELETE") {
          response = await concessionController.deleteConcession(request);
        }
    }

    if (url.pathname === "/auth/signin") {
          if (request.method === "POST") {
              response = await authentificationController.login(request);
          }
      }

    if (url.pathname === "/motorcycle-brand") {
          if (request.method === "GET") {
              response = await motorcycleBrandController.listMotorcyclesBrand(request);
          }
      }

    if (url.pathname === "/motorcycle-models") {
          if (request.method === "GET") {
              response = await motorcycleModelController.listMotorcyclesModels(request);
          }
          if (request.method === "POST") {
              response = await motorcycleModelController.createMotorcycleModel(request);
          }
      }

    if (!response) {
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
/*
else if (url.pathname.startsWith("/motorcycle-models/")) {
        const brandId = url.pathname.split("/")[2];
        if (request.method === "GET") {
            response = await motorcycleModelController.listMotorcycleByModels(request,brandId);
        } else {
            response = new Response("Method not allowed", { status: 405 });
        }
 */