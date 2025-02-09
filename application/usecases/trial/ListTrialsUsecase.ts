import {TrialRepository} from "../../repositories/TrialRepository.ts";

export class ListTrialsUsecase {
    public constructor(
        private readonly trialRepository: TrialRepository,
    ) {}

    public execute(concessionId: string) {
        return this.trialRepository.all(concessionId);
    }
}
