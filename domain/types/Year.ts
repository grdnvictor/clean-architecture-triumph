import {YearOutOfRangeError} from "../errors/YearOutOfRangeError.ts";

export class Year{
    private constructor(public readonly value: number) {}

    public static from(value: number) {
        if (value < 1900 || value > new Date().getFullYear()) {
            return new YearOutOfRangeError();
        }

        return new Year(value);
    }
}