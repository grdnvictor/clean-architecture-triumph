import {ConcessionRepository} from "../../repositories/ConcessionRepository.ts";

export class ListConcessionsUsecase {
    public constructor(
        private readonly concessionRepository: ConcessionRepository,
    ) {}

    public execute() {
        return this.concessionRepository.all();
    }
}
