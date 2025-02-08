import {ModelRepository} from "../../../../application/repositories/ModelRepository";
import {ListMotorcycleModelByBrandUsecase} from "../../../../application/usecases/ListMotorcycleModelByBrandUsecase";
import {ListMotorcycleModelUsecase} from "../../../../application/usecases/ListMotorcycleModelUsecase";

export class MotorcycleModelController {
  public constructor(
    private readonly modelRepository: ModelRepository,
  ) {}

    public async listMotorcycleByModels(_: Request, brandId:number): Promise<Response> {
        const listMotorcyclesUsecase = new ListMotorcycleModelByBrandUsecase(this.modelRepository);
        const models = await listMotorcyclesUsecase.execute(brandId);
        console.log(models);
        return new Response(JSON.stringify(models), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    public async listMotorcyclesModels(request: Request): Promise<Response> {
        const listMotorcyclesUsecase = new ListMotorcycleModelUsecase(this.modelRepository);
        const models = await listMotorcyclesUsecase.execute();
        return new Response(JSON.stringify(models), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}