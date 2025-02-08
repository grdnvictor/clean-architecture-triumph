import { z } from "npm:zod";

export const deleteClientRequestSchema = z.object({
  id: z.string().uuid(),
});