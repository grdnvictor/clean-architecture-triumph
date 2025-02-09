import { PartRepository } from "../../repositories/PartRepository";

export class ListPartsUsecase {
    public constructor(
        private readonly partRepository: PartRepository,
    ) {}

    public execute() {
        return this.partRepository.all();
    }
}
