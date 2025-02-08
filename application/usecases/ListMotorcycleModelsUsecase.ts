import type {ModelRepository} from "../repositories/ModelRepository.ts";
export class ListMotorcycleModelsUsecase {
    public constructor(
        private readonly modelRepository: ModelRepository,
    ) {}

    public execute() {
        return this.modelRepository.all();
    }
}
