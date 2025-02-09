import { z } from "npm:zod";

export const deleteConcessionRequestSchema = z.object({
  id: z.string().uuid(),
});