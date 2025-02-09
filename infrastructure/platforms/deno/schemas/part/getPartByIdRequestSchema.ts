import { z } from "npm:zod";

export const getPartByIdRequestSchema = z.object({
    id: z.string().uuid(),
});