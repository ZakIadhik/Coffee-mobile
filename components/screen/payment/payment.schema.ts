import { z } from "zod";

export const paymentSchema = z.object({
    cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Card number must be 19 digits"),
    cardHolderName: z.string().min(1, "Card holder name is required").max(20, "Card holder name must be 20 characters or less"),
    expiry: z.string().min(5, "Expiry date must be 5 digits").max(5, "Expiry date must be 5 digits"),
    cvv: z.string().min(3, "CVV must be 3 digits").max(4, "CVV must be 4 digits"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;