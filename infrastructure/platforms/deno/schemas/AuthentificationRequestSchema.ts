import { z } from "npm:zod";

export const authentificationRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
