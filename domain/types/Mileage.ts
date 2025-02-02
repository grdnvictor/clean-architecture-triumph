import {MileageInvalidError} from "../errors/MileageInvalidError.ts";

export class Mileage {
    private constructor(public readonly value: number) {}

    public static from(value: number) {
        if (value < 0) {
            return new MileageInvalidError();
        }

        return new Mileage(value);
    }
}