import {VinInvalidError} from "../errors/VinInvalidError.ts";

export class Vin {
    private constructor(public readonly value: string) {}

    public static from(value: string) {
        if (value.length !== 17) {
            return new VinInvalidError();
        }

        return new Vin(value);
    }
}