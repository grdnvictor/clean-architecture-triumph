export class MaintenanceType {
    private constructor(public readonly value: 'PREVENTIVE' | 'CURATIVE') {}

    public static from(value: string) {
        // Valeurs possibles pour le type de maintenance
        // assez parlant ?
        if (value !== 'PREVENTIVE' && value !== 'CURATIVE') {
            return new Error("Le type de maintenance doit être 'PREVENTIVE' ou 'CURATIVE'");
        }

        return new MaintenanceType(value as 'PREVENTIVE' | 'CURATIVE');
    }
}