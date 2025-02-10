import { z } from "npm:zod";

export const createAppointmentRequestSchema = z.object({
  date: z.date({ coerce: true }).refine(date => date >= new Date(), {
    message: "Date must be in the future",
  }),
  clientId: z.string().uuid(),
  motorcycleId: z.string().uuid(),
});
