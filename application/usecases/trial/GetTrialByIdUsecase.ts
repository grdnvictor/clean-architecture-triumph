import { TrialRepository } from "../../repositories/TrialRepository.ts";
import { TrialEntity } from "../../../domain/entities/TrialEntity.ts";
import { TrialNotFoundError } from "../../../domain/errors/TrialNotFoundError.ts";

export class GetTrialByIdUsecase {
    constructor(private readonly trialRepository: TrialRepository) {}

    public async execute(id: string): Promise<TrialEntity | TrialNotFoundError> {
        const trial = await this.trialRepository.findOneById(id);
        if (!trial) {
            return new TrialNotFoundError();
        }
        return trial;
    }
}