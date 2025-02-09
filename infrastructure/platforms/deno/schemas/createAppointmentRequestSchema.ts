import { z } from "npm:zod";

export const createAppointmentRequestSchema = z.object({
  date: z.date({ coerce: true }),
  clientId: z.string().uuid(),
  motorcycleId: z.string().uuid(),
});
