import { ClientRepository } from "../../repositories/ClientRepository.ts";
import { ClientEntity } from "../../../domain/entities/ClientEntity.ts";
import {PhoneNumber} from "../../../domain/types/PhoneNumber.ts";

export class GetClientByPhoneUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    public async execute(phone: string) {
        const phoneNumber = PhoneNumber.from(phone);
        if(phoneNumber instanceof Error){
            return phoneNumber;
        }
        return await this.clientRepository.findOneByPhone(phone);
    }
}