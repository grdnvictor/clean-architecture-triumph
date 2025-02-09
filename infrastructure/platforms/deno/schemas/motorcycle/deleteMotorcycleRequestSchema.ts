import { z } from "npm:zod";

export const deleteMotorcycleRequestSchema = z.object({
    id: z.string().uuid(),
});