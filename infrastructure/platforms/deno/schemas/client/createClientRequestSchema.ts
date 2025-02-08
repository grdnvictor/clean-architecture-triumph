import { z } from "npm:zod";

export const createClientRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  concessionId: z.string().uuid(),
});
