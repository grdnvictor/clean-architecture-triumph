import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";
import {Mileage} from "../../../domain/types/Mileage";

export class UpdateMotorcycleUsecase {
    constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

    public async execute(
        id: string,
        currentMileage?: number
    ) {
        const updatedData: Partial<{
            currentMileage: number;
        }> = {};

        if (currentMileage) {
            const currentMotorcycleMileage = Mileage.from(currentMileage);
            if (currentMotorcycleMileage instanceof Error) {
                return currentMileage;
            }
            updatedData.currentMileage = currentMotorcycleMileage.value;
        }

        await this.motorcycleRepository.update(id, updatedData);
    }
}