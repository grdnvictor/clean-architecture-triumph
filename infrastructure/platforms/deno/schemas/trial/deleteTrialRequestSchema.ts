import { z } from "zod";

export const deleteTrialRequestSchema = z.object({
    id: z.string().uuid(),
});