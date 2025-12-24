import { Prisma } from "../generated/prisma/client";
import prisma from "../prisma/client";

export const getAllBookings = async (bookingInput:Prisma.BookingCreateInput) => {
    const booking = await prisma.booking.create({
        data: bookingInput
    });
    return booking
};