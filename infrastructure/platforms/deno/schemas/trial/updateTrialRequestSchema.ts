import { z } from "zod";

export const updateTrialRequestSchema = z.object({
    clientId: z.string().uuid("Invalid client ID format").optional(),
    motorcycleId: z.string().uuid("Invalid motorcycle ID format").optional(),
    concessionId: z.string().uuid("Invalid concession ID format").optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date format").optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid end date format").optional(),
    mileageStart: z.number().min(0, "Mileage start must be a positive number").optional(),
    mileageEnd: z.number().min(0, "Mileage end must be a positive number").optional(),
    feedback: z.string().optional()
});