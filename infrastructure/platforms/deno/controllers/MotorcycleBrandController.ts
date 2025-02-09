import {BrandRepository} from "../../../../application/repositories/BrandRepository";
import {ListMotorcyclesBrandUsecase} from "../../../../application/usecases/ListMotorcycleBrandUsecase";

export class MotorcycleBrandController{
    public constructor(
        private readonly motorcycleBrandRepository: BrandRepository,
    ) {}

    public async listMotorcyclesBrand(_: Request): Promise<Response> {
        const listMotorcyclesBrandUsecase = new ListMotorcyclesBrandUsecase(this.motorcycleBrandRepository) ;
        const brand = await listMotorcyclesBrandUsecase.execute();
        return new Response(JSON.stringify(brand), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}