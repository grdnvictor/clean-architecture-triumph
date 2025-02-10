import { z } from "npm:zod";

export const updatePartRequestSchema = z.object({
    name: z.string().optional(),
    reference: z.string().optional(),
    stock: z.number().optional(),
    minimumStock: z.number().optional(),
});
