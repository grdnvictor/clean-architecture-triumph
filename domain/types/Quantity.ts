export class Quantity {
    private constructor(public readonly value: number) {}

    public static from(value: number) {
        if (value < 0) {
            return new Error("La quantité ne peut pas être négative");
        }

        return new Quantity(value);
    }
}