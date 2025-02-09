import {Model} from "../../../domain/types/Model.ts";
import {Mileage} from "../../../domain/types/Mileage.ts";
import {ModelEntity} from "../../../domain/entities/ModelEntity.ts";
import {ModelRepository} from "../../repositories/ModelRepository.ts";
import {Year} from "../../../domain/types/Year.ts";

export class CreateMotorcycleModelUsecase {
    public constructor(
        private readonly modelRepository : ModelRepository,
        ){}
    public async execute(brandId:string, name:string, year:number, distanceInterval:number, timeInterval:number, description:string) {
        const motorcycleModel = Model.from(name);

        if (motorcycleModel instanceof Error) {
            return motorcycleModel;
        }

        const mileage = Mileage.from(distanceInterval);

        if (mileage instanceof Error) {
            return mileage;
        }

        const yearNow = Year.from(year);
        if (yearNow instanceof Error) {
            return yearNow;
        }


        const motorcycle = ModelEntity.create(
            motorcycleModel,
            yearNow,
            brandId,
            description,
            mileage,
            timeInterval
        );
        await this.modelRepository.save(motorcycle);
    }
}