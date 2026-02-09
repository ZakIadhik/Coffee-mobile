import { z } from "zod";

export const personalInformationSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
});

export type PersonalInformationSchema = z.infer<typeof personalInformationSchema>;