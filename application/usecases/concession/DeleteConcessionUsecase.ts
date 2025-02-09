import { ConcessionRepository } from "../../repositories/ConcessionRepository.ts";

export class DeleteConcessionUsecase {
    constructor(private readonly concessionRepository: ConcessionRepository) {}

    public async execute(id: string): Promise<void> {
        await this.concessionRepository.delete(id);
    }
}