import { z } from "zod";

export const completeTrialRequestSchema = z.object({
    mileageEnd: z.number().min(0, "Mileage end must be a positive number"),
    feedback: z.string().optional()
});