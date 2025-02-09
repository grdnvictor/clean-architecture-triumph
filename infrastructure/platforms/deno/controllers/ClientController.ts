import type { ClientRepository } from "../../../../application/repositories/ClientRepository.ts";
import { createClientRequestSchema } from "../schemas/client/createClientRequestSchema";
import { updateClientRequestSchema } from "../schemas/client/updateClientRequestSchema";
import {ListClientsUsecase} from "../../../../application/usecases/client/ListClientsUsecase";
import {CreateClientUsecase} from "../../../../application/usecases/client/CreateClientUsecase";
import {DeleteClientUsecase} from "../../../../application/usecases/client/DeleteClientUsecase";
import {UpdateClientUsecase} from "../../../../application/usecases/client/UpdateClientUsecase";
import {GetClientByIdUsecase} from "../../../../application/usecases/client/GetClientByIdUsecase";
import {deleteClientRequestSchema} from "../schemas/client/deleteClientRequestSchema";
import {getClientByIdRequestSchema} from "../schemas/client/getClientByIdRequestSchema";

export class ClientController {
  constructor(private readonly repository: ClientRepository) {}

  public async listClients(_: Request): Promise<Response> {
    const listClientsUsecase = new ListClientsUsecase(
        this.repository
    );
    const clients = await listClientsUsecase.execute();

    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async createClient(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createClientRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response(null, { status: 400 });
    }

    const {
      firstName,
      lastName,
      concessionId
    } = validation.data;
    const createClientUsecase = new CreateClientUsecase(this.repository);
    const result = await createClientUsecase.execute(
        firstName,
        lastName,
        concessionId
    );

    if (result instanceof Error) {
      return new Response(result.message, {
        status: 400
      });
    }

    return new Response(null, {
      status: 201
    });
  }

  public async getClientById(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const validation = getClientByIdRequestSchema.safeParse({ id });
    if (!validation.success) return new Response("Invalid ID format", { status: 400 });

    const getClientByIdUsecase = new GetClientByIdUsecase(this.repository);
    const client = await getClientByIdUsecase.execute(id);
    if (!client) return new Response("Client not found", { status: 404 });

    return new Response(JSON.stringify(client), { headers: { "Content-Type": "application/json" } });
  }

  public async updateClient(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const body = await request.json();
    const validation = updateClientRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    const { firstName, lastName } = validation.data;
    const updateClientUsecase = new UpdateClientUsecase(this.repository);
    const result = await updateClientUsecase.execute(id, firstName, lastName);

    if (result instanceof Error) {
      return new Response(result.message, { status: 400 });
    }

    return new Response("Updated successfully", { status: 200 });
  }

  public async deleteClient(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const validation = deleteClientRequestSchema.safeParse({ id });
    if (!validation.success) {
      return new Response("Invalid ID format", {
        status: 400
      });
    }

    const deleteClientUsecase = new DeleteClientUsecase(this.repository);
    await deleteClientUsecase.execute(id);
    return new Response(null, {
      status: 200
    });
  }
}
