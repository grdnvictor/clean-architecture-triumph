import {ModelRepository} from "../../../../application/repositories/ModelRepository";
import {ListMotorcycleModelByBrandUsecase} from "../../../../application/usecases/ListMotorcycleModelByBrandUsecase";
import {ListMotorcycleModelUsecase} from "../../../../application/usecases/ListMotorcycleModelUsecase";
import {exhaustive} from "npm:exhaustive@1.1.2";
import {CreateMotorcycleModelUsecase} from "../../../../application/usecases/model/CreateMotorcycleModelUsecase.ts";
import {createMotorcycleModelRequestSchema} from "../schemas/createMotorcycleModelRequestSchema.ts";

export class MotorcycleModelController {
  public constructor(
    private readonly modelRepository: ModelRepository,
  ) {}

    public async listMotorcycleByModels(_: Request, brandId:number): Promise<Response> {
        const listMotorcyclesUsecase = new ListMotorcycleModelByBrandUsecase(this.modelRepository);
        const models = await listMotorcyclesUsecase.execute(brandId);
        return new Response(JSON.stringify(models), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    public async listMotorcyclesModels(_: Request): Promise<Response> {
        const listMotorcyclesUsecase = new ListMotorcycleModelUsecase(this.modelRepository);
        const models = await listMotorcyclesUsecase.execute();
        return new Response(JSON.stringify(models), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    public async createMotorcycleModel(request: Request): Promise<Response> {
        const createModelUsecase = new CreateMotorcycleModelUsecase(this.modelRepository);

        const body = await request.json();

        const validation = createMotorcycleModelRequestSchema.safeParse(body);

        if (!validation.success) {
            return new Response("Malformed request", {
                status: 400,
            });
        }

        const {brandId, name, year, maintenanceIntervalKm, maintenanceIntervalMonths, description} = validation.data;
        const error = await createModelUsecase.execute(brandId, name, year, maintenanceIntervalKm, maintenanceIntervalMonths, description);
        console.log("error", error);
        if (!error) {
            return new Response(null, {
                status: 201,
            });
        }

        return exhaustive(error.name, {
            ModelLengthTooShortError: () => new Response("ModelLengthTooShortError", { status: 400 }),
            MileageInvalidError: () => new Response("MileageInvalidError", { status: 400 }),
            YearOutOfRangeError: () => new Response("YearOutOfRangeError", { status: 400 }),

        });
    }
}