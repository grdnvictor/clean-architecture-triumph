import { z } from "npm:zod";
export const createPhoneRequestSchema = z.object({
  phoneNumber: z.string().min(10).max(10),
});