import { z } from "npm:zod";

export const createMotorcycleRequestSchema = z.object({
  vin: z.string(),
  modelId: z.string().uuid(),
  concessionId: z.string().uuid(),
  currentMileage: z.number()
});
