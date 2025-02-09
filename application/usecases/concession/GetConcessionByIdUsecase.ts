import { ConcessionRepository } from "../../repositories/ConcessionRepository.ts";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity.ts";

export class GetConcessionByIdUsecase {
    constructor(private readonly concessionRepository: ConcessionRepository) {}

    public async execute(id: string): Promise<ConcessionEntity | null> {
        return await this.concessionRepository.findOneById(id);
    }
}