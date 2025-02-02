export class IncidentSeverity {
    private constructor(public readonly value: 'LOW' | 'MEDIUM' | 'HIGH') {}

    public static from(value: string) {
        if (value !== 'LOW' && value !== 'MEDIUM' && value !== 'HIGH') {
            return new Error("La sévérité doit être 'LOW', 'MEDIUM' ou 'HIGH'");
        }

        return new IncidentSeverity(value as 'LOW' | 'MEDIUM' | 'HIGH');
    }
}