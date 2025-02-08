import { ClientRepository } from "../../repositories/ClientRepository.ts";

export class DeleteClientUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    public async execute(id: string): Promise<void> {
        await this.clientRepository.delete(id);
    }
}