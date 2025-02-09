import {ClientMotorcycleRepository} from "../../repositories/ClientMotorcycleRepository.ts";

export class GetClientMotorcyclesUsecase {
  constructor(private readonly clientMotorcycleRepository: ClientMotorcycleRepository) {}

    public  async execute(clientId:string) {
        return await this.clientMotorcycleRepository.findOneByClientId(clientId);
    }
}