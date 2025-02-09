import {MotorcycleRepository} from "../../repositories/MotorcycleRepository";

export class ListMotorcyclesUsecase {
    public constructor(
        private readonly motorcycleRepository: MotorcycleRepository,
    ) {}

    public execute() {
        return this.motorcycleRepository.all();
    }
}
