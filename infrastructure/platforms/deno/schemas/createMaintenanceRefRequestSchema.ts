import { z } from "npm:zod";

export const createMaintenanceRefRequestSchema = z.object({
    brand: z.string(),
    model: z.string(),
    interval
});
