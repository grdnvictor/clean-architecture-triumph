import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";

export class DeleteMotorcycleUsecase {
    constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

    public async execute(id: string): Promise<void> {
        await this.motorcycleRepository.delete(id);
    }
}