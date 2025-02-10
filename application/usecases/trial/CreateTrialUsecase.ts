import { TrialRepository } from "../../repositories/TrialRepository.ts";
import { ClientRepository } from "../../repositories/ClientRepository.ts";
import { TrialEntity } from "../../../domain/entities/TrialEntity.ts";
import {ClientNotFoundInConcessionError} from "../../../domain/errors/ClientNotFoundInConcessionError.ts";

export class CreateTrialUsecase {
    constructor(
        private readonly trialRepository: TrialRepository,
        private readonly clientRepository: ClientRepository,
    ) {}

    public async execute(
        clientId: string,
        motorcycleId: string,
        concessionId: string,
        startDate: Date,
        endDate: Date,
        mileageStart: number
    ) {
        const clientExists = await this.clientRepository.existsInConcession(clientId, concessionId);
        if (!clientExists) {
            return new ClientNotFoundInConcessionError();
        }

        const trial = TrialEntity.create(
            clientId,
            motorcycleId,
            concessionId,
            startDate,
            endDate,
            mileageStart
        );

        await this.trialRepository.save(trial);
    }
}