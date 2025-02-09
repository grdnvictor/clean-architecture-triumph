import {PhoneNumber} from "../../../domain/types/PhoneNumber.ts";
import {Siret} from "../../../domain/types/Siret.ts";
import {ConcessionRepository} from "../../repositories/ConcessionRepository.ts";

export class UpdateConcessionUsecase {
    constructor(private readonly concessionRepository: ConcessionRepository) {}

    public async execute(id: string, name?: string, phoneNumber?: string, siret?: string, address?: string) {
        const updatedData: Partial<{
            name: string;
            phoneNumber: string;
            siret: string;
            address: string;
        }> = {};

        if (name) {
            updatedData.name = name;
        }

        if (address) {
            updatedData.address = address;
        }

        if (phoneNumber) {
            const concessionPhoneNumber = PhoneNumber.from(phoneNumber);
            if (concessionPhoneNumber instanceof Error) {
                return concessionPhoneNumber;
            }
            updatedData.phoneNumber = concessionPhoneNumber.value;
        }

        if (siret) {
            const concessionSiret = Siret.from(siret);
            if (concessionSiret instanceof Error) {
                return concessionSiret;
            }
            updatedData.siret = concessionSiret.value;
        }

        await this.concessionRepository.update(id, updatedData);
    }
}