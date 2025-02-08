import type { BrandRepository } from "../repositories/BrandRepository.ts";
export class ListMotorcyclesBrandUsecase {
    public constructor(private readonly brandRepository: BrandRepository){}


    public execute() {
        return this.brandRepository.all();
    }
}