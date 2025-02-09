import {ListMotorcyclesUsecase} from "./ListMotorcyclesUsecase";
import type {MotorcycleRepository} from "../repositories/MotorcycleRepository";

export class ListMaintenanceUsecase {
    public constructor(private readonly motorcycleRepository: MotorcycleRepository){}


    public async listMotorcycleModels(request: Request): Promise<Response> {
            const listMotorcycleModelsUsecase = new ListMotorcyclesUsecase(this.motorcycleRepository);
            const motorcycleModels = await listMotorcycleModelsUsecase.execute();
            return new Response(JSON.stringify(motorcycleModels), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
}