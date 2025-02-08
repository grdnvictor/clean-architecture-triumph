import { z } from "npm:zod";

export const getClientByIdRequestSchema = z.object({
  id: z.string().uuid(),
});