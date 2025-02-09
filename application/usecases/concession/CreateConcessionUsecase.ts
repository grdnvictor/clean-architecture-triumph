import {ConcessionRepository} from "../../repositories/ConcessionRepository.ts";
import {Siret} from "../../../domain/types/Siret.ts";
import {PhoneNumber} from "../../../domain/types/PhoneNumber.ts";
import {ConcessionEntity} from "../../../domain/entities/ConcessionEntity.ts";

export class CreateConcessionUsecase {
    public constructor(
        private readonly concessionRepository: ConcessionRepository,
    ) {}

    public async execute(name: string, phoneNumber: string, siret: string, address: string) {
        const concessionPhoneNumber = PhoneNumber.from(phoneNumber);
        if (concessionPhoneNumber instanceof Error) {
            return concessionPhoneNumber;
        }

        const concessionSiret = Siret.from(siret);
        if (concessionSiret instanceof Error) {
            return concessionSiret;
        }

        const client = ConcessionEntity.create(
            name,
            concessionPhoneNumber,
            concessionSiret,
            address
        );

        await this.concessionRepository.save(client);
    }
}
