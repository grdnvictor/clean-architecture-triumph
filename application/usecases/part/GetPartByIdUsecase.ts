import { PartRepository } from "../../repositories/PartRepository";
import { PartEntity } from "../../../domain/entities/PartEntity";

export class GetPartByIdUsecase {
    constructor(private readonly partRepository: PartRepository) {}

    public async execute(id: string): Promise<PartEntity | null> {
        return await this.partRepository.findOneById(id);
    }
}