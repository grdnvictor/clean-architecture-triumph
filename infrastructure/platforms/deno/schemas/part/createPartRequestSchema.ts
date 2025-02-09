import { z } from "npm:zod";

export const createPartRequestSchema = z.object({
    name: z.string(),
    reference: z.string(),
    stock: z.number().optional(),
    minimumStock: z.number().optional(),
});