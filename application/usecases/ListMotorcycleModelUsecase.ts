import type {ModelRepository} from "../repositories/ModelRepository.ts";

export class ListMotorcycleModelUsecase{
    public constructor(
        private readonly modelRepository: ModelRepository,
    ) {}

    public execute() {
        return this.modelRepository.all();

    }
}