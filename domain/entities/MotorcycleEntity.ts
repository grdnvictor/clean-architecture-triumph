import {Brand} from "../types/Brand";
import {Model} from "../types/Model";
import {Mileage} from "../types/Mileage";

export class MotorcycleEntity {
  private constructor(
      public readonly identifier: string,
      public readonly vin: string,
      public readonly modelId: string,
      public readonly concessionId: number,
      public readonly currentMileage: number,
      public readonly createdAt: Date,
      public readonly updatedAt: Date,
  ) {}

  public static create(
      vin: Brand,
      modelId: Model,
      concessionId: number,
      currentMileage: Mileage
  ) {
    return new MotorcycleEntity(
        crypto.randomUUID(),
        vin.value,
        modelId.value,
        concessionId,
        currentMileage.value,
        new Date(),
        new Date()
    );
  }
}