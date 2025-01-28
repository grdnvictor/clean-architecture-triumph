export class Status {
    private constructor(public readonly value: 'ACTIVE' | 'INACTIVE' | 'PENDING') {}

    public static from(value: string) {
        if (value !== 'ACTIVE' && value !== 'INACTIVE' && value !== 'PENDING') {
            return new Error("Le status doit être 'ACTIVE', 'INACTIVE' ou 'PENDING'");
        }

        return new Status(value as 'ACTIVE' | 'INACTIVE' | 'PENDING');
    }
}