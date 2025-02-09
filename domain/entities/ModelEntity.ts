import {Model} from "../types/Model.ts";
import {Mileage} from "../types/Mileage.ts";
import {Year} from "../types/Year.ts";

export class ModelEntity {
    private constructor(
        public readonly identifier: string,
        public readonly name: string,
        public readonly year: number,
        public readonly brandId: string,
        public readonly description: string,
        public readonly maintenanceIntervalKm: number,
        public readonly maintenanceIntervalMonths: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public static create(
        name: Model,
        year: Year,
        brandId: string,
        description: string,
        maintenanceIntervalKm: Mileage,
        maintenanceIntervalMonths: number
    ) {
        return new ModelEntity(
            crypto.randomUUID(),
            name.value,
            year.value,
            brandId,
            description,
            maintenanceIntervalKm.value,
            maintenanceIntervalMonths,
            new Date(),
            new Date()
        );
    }
}