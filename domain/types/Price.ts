export class Price {
    private constructor(public readonly value: number) {}

    public static from(value: number) {
        if (value < 0) {
            return new Error("Le prix ne peut pas être négatif");
        }

        return new Price(value);
    }
}