import { z } from "zod";

export const cardInformationSchema = z.object({
    cardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits"),
    cardHolder: z.string().min(1, "Card holder name is required"),
    expiryDate: z.string().min(5, "Expiry date must be in MM/YY format").max(5, "Expiry date must be in MM/YY format"),
    cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
});

export type CardInformationSchema = z.infer<typeof cardInformationSchema>;
