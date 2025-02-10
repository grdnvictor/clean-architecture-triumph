import {Vin} from "../types/Vin.ts";
import {Mileage} from "../types/Mileage.ts";

export class ClientMotorcycleEntity {
    private constructor(
        public readonly identifier: string,
        public readonly vin: string,
        public readonly modelId: string,
        public readonly clientId: string,
        public readonly motorcycleId: string,
        public readonly currentMileage: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
    public static create(
        vin: Vin, modelId: string,  clientId: string, motorcycleId: string, currentMileage: Mileage) {
        return new ClientMotorcycleEntity(
            crypto.randomUUID(),
            vin.value,
            modelId,
            clientId,
            motorcycleId,
            currentMileage.value,
            new Date(),
            new Date()
        );
    }
}