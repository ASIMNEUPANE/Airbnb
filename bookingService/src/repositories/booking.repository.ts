import { Prisma } from "../generated/prisma/client";
import prisma from "../prisma/client";

export const createBooking = async (bookingInput:Prisma.BookingCreateInput) => {
    const booking = await prisma.booking.create({
        data: bookingInput
    });
    return booking
};