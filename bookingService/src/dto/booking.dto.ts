import { createBookingSchema } from "../validators/booking.validator";
import { z } from "zod";

export type CreateBookingDTO =z.infer<typeof createBookingSchema>;