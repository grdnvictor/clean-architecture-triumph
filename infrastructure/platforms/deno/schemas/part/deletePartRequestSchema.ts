import { z } from "npm:zod";

export const deletePartRequestSchema = z.object({
    id: z.string().uuid(),
});
