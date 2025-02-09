import { z } from "npm:zod";

export const getConcessionByIdRequestSchema = z.object({
  id: z.string().uuid(),
});