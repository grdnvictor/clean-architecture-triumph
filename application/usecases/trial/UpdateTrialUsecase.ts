import { TrialRepository } from "../../repositories/TrialRepository.ts";
import { ClientRepository } from "../../repositories/ClientRepository.ts";
import { ConcessionRepository } from "../../repositories/ConcessionRepository.ts";
import { TrialEntity } from "../../../domain/entities/TrialEntity.ts";
import { TrialNotFoundError } from "../../../domain/errors/TrialNotFoundError.ts";
import { ClientNotFoundInConcessionError } from "../../../domain/errors/ClientNotFoundInConcessionError.ts";
import {MotorcycleNotFoundInConcessionError} from "../../../domain/errors/MotorcycleNotFoundInConcessionError.ts";

export class UpdateTrialUsecase {
    constructor(
        private readonly trialRepository: TrialRepository,
        private readonly clientRepository: ClientRepository,
        private readonly concessionRepository: ConcessionRepository
    ) {}

    public async execute(
        id: string,
        clientId?: string,
        motorcycleId?: string,
        concessionId?: string,
        startDate?: Date,
        endDate?: Date,
        mileageStart?: number,
        mileageEnd?: number,
        feedback?: string
    ): Promise<undefined | TrialNotFoundError | ClientNotFoundInConcessionError | MotorcycleNotFoundInConcessionError> {
        const trial = await this.trialRepository.findOneById(id);
        if (!trial) {
            return new TrialNotFoundError();
        }

        const updatedData: Partial<{
            clientId: string;
            motorcycleId: string;
            startDate: Date;
            endDate: Date;
            mileageStart: number;
            mileageEnd: number;
            feedback: string;
        }> = {};

        if (clientId) {
            const clientExists = await this.clientRepository.existsInConcession(clientId, trial.concessionId);
            if (!clientExists) {
                return new ClientNotFoundInConcessionError();
            }
            updatedData.clientId = clientId;
        }

        if (motorcycleId) {
            const motorcycleExists = await this.concessionRepository.motorcycleExistsInConcession(motorcycleId, trial.concessionId);
            if (!motorcycleExists) {
                return new MotorcycleNotFoundInConcessionError();
            }

            updatedData.motorcycleId = motorcycleId;
        }

        if (startDate) {
            updatedData.startDate = startDate;
        }

        if (endDate) {
            updatedData.endDate = endDate;
        }

        if (mileageStart !== undefined) {
            updatedData.mileageStart = mileageStart;
        }

        if (mileageEnd !== undefined) {
            updatedData.mileageEnd = mileageEnd;
        }

        if (feedback) {
            updatedData.feedback = feedback;
        }

        await this.trialRepository.update(id, updatedData);
    }
}