import { TrialRepository } from "../../repositories/TrialRepository.ts";

export class CompleteTrialUsecase {
    constructor(private readonly trialRepository: TrialRepository) {}

    public async execute(id: string, mileageEnd: number, feedback?: string) {
        const updatedData: Partial<{
            mileageEnd: number;
            feedback: string;
            updatedAt: Date;
        }> = {};

        updatedData.mileageEnd = mileageEnd;

        if (feedback !== undefined) {
            updatedData.feedback = feedback;
        }

        updatedData.updatedAt = new Date();

        await this.trialRepository.update(id, updatedData);
    }
}