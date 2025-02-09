import { z } from "npm:zod";

export const createConcessionRequestSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().regex(/^0[67]\d{8}$/),
  siret: z.string().regex(/^\d{14}$/),
  address: z.string(),
});
