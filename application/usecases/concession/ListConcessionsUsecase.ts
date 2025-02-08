import {ConcessionRepository} from "../../repositories/ConcessionRepository.ts";

export class ListClientsUsecase {
    public constructor(
        private readonly concessionRepository: ConcessionRepository,
    ) {}

    public execute() {
        return this.concessionRepository.all();
    }
}
