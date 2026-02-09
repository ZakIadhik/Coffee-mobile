import { z } from "zod";

export const cuponsSchema = z.object({
    code: z.string().min(1, "Code is required"),
    cuponImage: z.string().min(1, "Image is required"),
});

export type CuponsSchema = z.infer<typeof cuponsSchema>;