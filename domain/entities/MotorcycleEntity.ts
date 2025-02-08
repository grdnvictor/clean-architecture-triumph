export class MotorcycleEntity {
  private constructor(
      public readonly identifier: string,
      public readonly vin: string,
      public readonly modelId: string,
      public readonly concessionId: string,
      public readonly currentMileage: number,
      public readonly createdAt: Date,
      public readonly updatedAt: Date,
  ) {}

  public static create(
      vin: string,
      modelId: string,
      concessionId: string,
      currentMileage: number = 0
  ) {
    return new MotorcycleEntity(
        crypto.randomUUID(),
        vin,
        modelId,
        concessionId,
        currentMileage,
        new Date(),
        new Date()
    );
  }
}