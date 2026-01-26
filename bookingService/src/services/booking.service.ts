import { CreateBookingDTO } from '../dto/booking.dto'
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock } from '../repositories/booking.repository'
import { BadRequestError, InternalServerError } from '../utils/errors/app.error'
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey'
import prisma from "../lib/prisma";
import { redLock } from '../config/redis.config';
import { serverConfig } from '../config';


export const createBookingService = async (payload: CreateBookingDTO) => {
    const bookingResource = `hotel:${payload.hotelId}`;
    let ttl = serverConfig.LOCK_TTL
    let lock;
    try {
      lock =   await redLock.acquire([bookingResource], ttl)
            const booking = await createBooking({
                ...payload
            })
            const idempotencyKey = generateIdempotencyKey()
            await createIdempotencyKey(idempotencyKey, booking.id)
            console.log({ bookingId: booking.id, idempotencyKey })
            return { bookingId: booking.id, idempotencyKey }
    } catch (error) {
        await lock?.release() 
        throw new InternalServerError("Failed to acquire lock for booking resource"+ error)
    }
}

export const confirmBookingService = async (idempotencyKey: string) => {

    return await prisma.$transaction(async (tx) => {

        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx, idempotencyKey)
        if (idempotencyKeyData.finalize) {
            throw new BadRequestError('Booking already finalized')
        }
        const booking = await confirmBooking(tx, idempotencyKeyData.bookingId)
        await finalizeIdempotencyKey(tx, idempotencyKey)

        return booking;
    })

}