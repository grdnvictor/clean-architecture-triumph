import type {ModelRepository} from "../repositories/ModelRepository";

export class ListMotorcycleModelUsecase{
    public constructor(
        private readonly modelRepository: ModelRepository,
    ) {}

    public execute() {
        return this.modelRepository.all();

    }
}