import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository.ts";
import type { BrandRepository } from "../../../../application/repositories/BrandRepository";
import { exhaustive } from "npm:exhaustive";
import { createMotorcycleRequestSchema } from "../schemas/createMotorcycleRequestSchema.ts";

export class MotorcycleController {
  public constructor(
      private readonly motorcycleRepository: MotorcycleRepository,
      private readonly brandRepository: BrandRepository,
      private readonly modelRepository: ModelRepository,
  ) {}


  public async createMotorcycle(request: Request): Promise<Response> {
    const createMotorcycleUsecase = new CreateMotorcycleUsecase(this.motorcycleRepository);
    const body = await request.json();
    const validation = createMotorcycleRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", {
        status: 400,
      });
    }

    const { brand, model, year } = validation.data;
    const error = await createMotorcycleUsecase.execute(brand, model, year);

    if (!error) {
      return new Response(null, {
        status: 201,
      });
    }

    return exhaustive(error.name, {
      BrandLengthTooShortError: () => new Response("BrandLengthTooShortError", { status: 400 }),
      ModelLengthTooShortError: () => new Response("ModelLengthTooShortError", { status: 400 }),
    });
  }
  public async createMaintenanceRef(request: Request): Promise<Response> {
    const createMaintenanceRefUsecase = new CreateMaintenanceRefUsecase(this.motorcycleRepository);
    const body = await request.json();
    const validation = createMaintenanceRefRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", {
        status: 400,
      });
    }

    const { maintenanceIntervalKm, maintenanceIntervalMonths } = validation.data;
    const error = await createMaintenanceRefUsecase.execute(maintenanceIntervalKm, maintenanceIntervalMonths);

    if (!error) {
      return new Response(null, {
        status: 201,
      });
    }

    return exhaustive(error.name, {
      MaintenanceIntervalKmTooShortError: () => new Response("MaintenanceIntervalKmTooShortError", { status: 400 }),
      MaintenanceIntervalMonthsTooShortError: () => new Response("MaintenanceIntervalMonthsTooShortError", { status: 400 }),
    });

  }
}
