import { PartRepository } from "../../repositories/PartRepository";

export class UpdatePartUsecase {
    constructor(private readonly partRepository: PartRepository) {}

    public async execute(id: string, name?: string, reference?: string, stock?: number, minimumStock?: number) {
        const updatedData: Partial<{ name: string; reference: string; stock: number; minimumStock: number }> = {};

        if (name) {
            updatedData.name = name;
        }

        if (reference) {
            updatedData.reference = reference;
        }

        if (stock !== undefined) {
            updatedData.stock = stock;
        }

        if (minimumStock !== undefined) {
            updatedData.minimumStock = minimumStock;
        }

        await this.partRepository.update(id, updatedData);
    }
}
