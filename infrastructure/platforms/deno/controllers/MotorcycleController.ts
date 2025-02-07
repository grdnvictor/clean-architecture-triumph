import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository";
import { MotorcycleRepositoryPostgres } from "../../../adapters/repositories/MotorcycleRepositoryPostgres";
import { createMotorcycleRequestSchema } from "../schemas/createMotorcycleRequestSchema";
import {MotorcycleEntity} from "../../../../domain/entities/MotorcycleEntity";

export class MotorcycleController {
  private repository: MotorcycleRepository;

  constructor() {
    this.repository = new MotorcycleRepositoryPostgres();
  }

  public async listMotorcycles(_: Request): Promise<Response> {
    const motorcycles = await this.repository.all();
    return new Response(JSON.stringify(motorcycles), { headers: { "Content-Type": "application/json" } });
  }

  public async getMotorcycleById(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const motorcycle = await this.repository.findOneById(id);
    if (!motorcycle) return new Response("Motorcycle not found", { status: 404 });

    return new Response(JSON.stringify(motorcycle), { headers: { "Content-Type": "application/json" } });
  }

  public async createMotorcycle(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createMotorcycleRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    const { brand, model, year } = validation.data;
    const motorcycle = MotorcycleEntity.create(brand, model, year);
    await this.repository.save(motorcycle);

    return new Response(null, { status: 201 });
  }

  public async updateMotorcycle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const body = await request.json();
    await this.repository.update(id, body);
    return new Response("Updated successfully", { status: 200 });
  }

  public async deleteMotorcycle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    await this.repository.delete(id);
    return new Response("Deleted successfully", { status: 200 });
  }
}
