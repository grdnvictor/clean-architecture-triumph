import {StockInvalidError} from "../errors/StockInvalidError.ts";

export class Stock {
    private constructor(public readonly value: number) {}

    public static from(value: number) {
        if (value < 0) {
            return new StockInvalidError();
        }

        return new Stock(value);
    }
}