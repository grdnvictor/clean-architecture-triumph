import {ClientEntity} from "../../../domain/entities/ClientEntity.ts";
import {ClientRepository} from "../../repositories/ClientRepository.ts";
import {Firstname} from "../../../domain/types/Firstname.ts";
import {Lastname} from "../../../domain/types/Lastname.ts";
import {PhoneNumber} from "../../../domain/types/PhoneNumber";

export class CreateClientUsecase {
    public constructor(
        private readonly clientRepository: ClientRepository,
    ) {}

    public async execute(firstname: string, lastname: string, concessionId: string, phone: string): Promise<void> {
        const clientFirstname = Firstname.from(firstname);
        if (clientFirstname instanceof Error) {
            return clientFirstname;
        }

        const clientLastname = Lastname.from(lastname);
        if (clientLastname instanceof Error) {
            return clientLastname;
        }

        const clientPhone = PhoneNumber.from(phone);
        if (clientPhone instanceof Error) {
            return clientPhone;
        }


        const client = ClientEntity.create(
            clientFirstname,
            clientLastname,
            clientPhone,
            concessionId
        );

        await this.clientRepository.save(client);
    }
}
