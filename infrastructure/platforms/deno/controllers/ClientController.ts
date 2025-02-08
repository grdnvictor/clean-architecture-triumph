import type { ClientRepository } from "../../../../application/repositories/ClientRepository.ts";
import { createClientRequestSchema } from "../schemas/createClientRequestSchema.ts";
import {ClientEntity} from "../../../../domain/entities/ClientEntity.ts";
import { updateClientRequestSchema } from "../schemas/updateClientRequestSchema.ts";
import {ListClientsUsecase} from "../../../../application/usecases/client/ListClientsUsecase.ts";

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

  public async getClientById(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const client = await this.repository.findOneById(id);
    if (!client) return new Response("Client not found", { status: 404 });

    return new Response(JSON.stringify(client), { headers: { "Content-Type": "application/json" } });
  }

  public async createClient(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createClientRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    const { userId, firstName, lastName } = validation.data;
    const client = ClientEntity.create(userId, firstName, lastName);

    await this.repository.save(client);

    return new Response(null, { status: 201 });
  }

  public async updateClient(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const body = await request.json();
    const validation = updateClientRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    await this.repository.update(id, body);
    return new Response("Updated successfully", { status: 200 });
  }

  public async deleteClient(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    await this.repository.delete(id);
    return new Response("Deleted successfully", { status: 200 });
  }
}
