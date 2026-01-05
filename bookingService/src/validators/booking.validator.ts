import { z } from "zod";

export const createBookingSchema = z.object({
    userId: z.number(),
    hotelId: z.number().min(1),
    totalGuests: z.number().min(1),
    amount: z.number().min(0)
})

