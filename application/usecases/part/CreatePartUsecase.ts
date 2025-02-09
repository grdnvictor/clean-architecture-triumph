import { PartEntity } from "../../../domain/entities/PartEntity";
import { PartRepository } from "../../repositories/PartRepository";

export class CreatePartUsecase {
    public constructor(
        private readonly partRepository: PartRepository,
    ) {}

    public async execute(name: string, reference: string, stock: number = 0, minimumStock: number = 1) {
        if (!name || !reference) {
            throw new Error("Name and reference are required");
        }

        const part = PartEntity.create(name, reference, stock, minimumStock);
        if (part instanceof Error) {
            return part;
        }

        await this.partRepository.save(part);
    }
}
