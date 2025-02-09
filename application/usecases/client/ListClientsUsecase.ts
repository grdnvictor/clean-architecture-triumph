import {ClientRepository} from "../../repositories/ClientRepository.ts";

export class ListClientsUsecase {
    public constructor(
        private readonly clientRepository: ClientRepository,
    ) {}

    public execute() {
        return this.clientRepository.all();
    }
}
