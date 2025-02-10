import { ClientRepository } from "../../repositories/ClientRepository";
import { ClientEntity } from "../../../domain/entities/ClientEntity";

export class GetClientByIdUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    public async execute(id: string): Promise<ClientEntity | null> {
        return await this.clientRepository.findOneById(id);
    }
}