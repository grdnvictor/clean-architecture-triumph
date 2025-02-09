import {ClientRepository} from "../../repositories/ClientRepository";

export class ListClientsUsecase {
    public constructor(
        private readonly clientRepository: ClientRepository,
    ) {}

    public execute() {
        return this.clientRepository.all();
    }
}
