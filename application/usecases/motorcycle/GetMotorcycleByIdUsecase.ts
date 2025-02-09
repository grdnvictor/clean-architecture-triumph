import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";

export class GetMotorcycleByIdUsecase {
    constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

    public async execute(id: string): Promise<MotorcycleEntity | null> {
        return await this.motorcycleRepository.findOneById(id);
    }
}