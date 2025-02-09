import { PartRepository } from "../../repositories/PartRepository";

export class DeletePartUsecase {
    constructor(private readonly partRepository: PartRepository) {}

    public async execute(id: string): Promise<void> {
        await this.partRepository.delete(id);
    }
}
