import {GetClientMotorcyclesUsecase} from "../../../../application/usecases/client_moto/GetClientMotorcyclesUsecase.ts";
import {getClientByIdRequestSchema} from "../schemas/client/index.ts";
import type {ClientMotorcycleRepository} from "../../../../application/repositories/ClientMotorcycleRepository.ts";

export class ClientMotorcycleController {
  constructor(private readonly repository: ClientMotorcycleRepository) {}


     async getClientMotorcycles(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const clientId = url.pathname.split("/").pop();
        if (!clientId) return new Response("Missing client ID", { status: 400 });

        const validation = getClientByIdRequestSchema.safeParse({ id :clientId });
        if (!validation.success) return new Response("Invalid ID format", { status: 400 });

        const getClientMotorcyclesUsecase = new GetClientMotorcyclesUsecase(this.repository);
        const motorcycles = await getClientMotorcyclesUsecase.execute(clientId);
        if (!motorcycles) return new Response("Motorcycle not found", { status: 404 });

        return new Response(JSON.stringify(motorcycles), { headers: { "Content-Type": "application/json" } });


    }
}