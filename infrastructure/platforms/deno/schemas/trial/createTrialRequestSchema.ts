import { z } from "zod";

export const createTrialRequestSchema = z.object({
    clientId: z.string().uuid("Invalid client ID format"),
    motorcycleId: z.string().uuid("Invalid motorcycle ID format"),
    concessionId: z.string().uuid("Invalid concession ID format"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date format"),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid end date format"),
    mileageStart: z.number().min(0, "Mileage start must be a positive number")
});