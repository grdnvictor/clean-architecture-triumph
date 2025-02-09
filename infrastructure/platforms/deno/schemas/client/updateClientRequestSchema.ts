import { z } from "npm:zod";

export const updateClientRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
