import type {ModelRepository} from "../repositories/ModelRepository.ts";
import {ModelNotFoundError} from "../../domain/errors/ModelNotFoundError";
export class ListMotorcycleModelByBrandUsecase {
    public constructor(
        private readonly modelRepository: ModelRepository,
    ) {}

    public execute(brand:number) {
        const models = this.modelRepository.findByOption({where: {brand_id: brand}});
        if (!models) {
            return new ModelNotFoundError();
        }
        return models;
    }
}
