import { ClientRepository } from "../../repositories/ClientRepository";
import { Firstname } from "../../../domain/types/Firstname";
import { Lastname } from "../../../domain/types/Lastname";

export class UpdateClientUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    public async execute(id: string, firstname?: string, lastname?: string) {
        const updatedData: Partial<{ firstName: string; lastName: string }> = {};

        if (firstname) {
            const clientFirstname = Firstname.from(firstname);
            if (clientFirstname instanceof Error) {
                return clientFirstname;
            }
            updatedData.firstName = clientFirstname.value;
        }

        if (lastname) {
            const clientLastname = Lastname.from(lastname);
            if (clientLastname instanceof Error) {
                return clientLastname;
            }
            updatedData.lastName = clientLastname.value;
        }

        await this.clientRepository.update(id, updatedData);
    }
}