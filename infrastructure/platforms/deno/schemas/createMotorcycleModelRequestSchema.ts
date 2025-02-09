import { z } from "npm:zod";
const currentYear = new Date().getFullYear();
export const createMotorcycleModelRequestSchema = z.object({
    brandId: z.string(),
    name: z.string(),
    year: z.number().min(1900).max(currentYear),
    maintenanceIntervalKm: z.number(),
    maintenanceIntervalMonths: z.number(),
    description: z.string(),

});
