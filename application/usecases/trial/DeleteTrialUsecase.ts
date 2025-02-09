import { TrialRepository } from "../../repositories/TrialRepository.ts";

export class DeleteTrialUsecase {
    constructor(private readonly trialRepository: TrialRepository) {}

    public async execute(id: string): Promise<void> {
        await this.trialRepository.delete(id);
    }
}