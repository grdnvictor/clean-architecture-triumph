import { z } from "npm:zod";

export const createClientRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  concessionId: z.string().uuid(),
  phone: z.string().min(10).max(10),
});
