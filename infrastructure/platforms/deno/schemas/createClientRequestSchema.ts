import { z } from "npm:zod";

export const createClientRequestSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
});
