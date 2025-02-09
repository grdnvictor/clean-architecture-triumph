import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository";
import { createMotorcycleRequestSchema } from "../schemas/createMotorcycleRequestSchema";
import { MotorcycleEntity } from "../../../../domain/entities/MotorcycleEntity";
import { DeleteMotorcycleUsecase } from "../../../../application/usecases/motorcycle/DeletMotorcycleUsecase";
import { deleteMotorcycleRequestSchema } from "../schemas/motorcycle/deleteMotorcycleRequestSchema";

export class MotorcycleController {
  constructor(private readonly repository: MotorcycleRepository) {}

  public async listMotorcycles(_: Request): Promise<Response> {
    const motorcycles = await this.repository.all();
    return new Response(JSON.stringify(motorcycles), { headers: { "Content-Type": "application/json" } });
  }

  public async createMotorcycle(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createMotorcycleRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    const { vin, modelId, concessionId, currentMileage } = validation.data;
    const motorcycle = MotorcycleEntity.create(vin, modelId, concessionId, currentMileage);

    await this.repository.save(motorcycle);

    return new Response(null, { status: 201 });
  }

  public async deleteMotorcycle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const validation = deleteMotorcycleRequestSchema.safeParse({ id });
    if (!validation.success) {
      return new Response("Invalid ID format", { status: 400 });
    }

    const deleteMotorcycleUsecase = new DeleteMotorcycleUsecase(this.repository);
    await deleteMotorcycleUsecase.execute(id);
    return new Response(null, { status: 200 });
  }
}