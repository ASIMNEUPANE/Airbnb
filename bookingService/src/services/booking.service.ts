import { CreateBookingDTO } from '../dto/booking.dto'
import {confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock} from '../repositories/booking.repository'
import { BadRequestError } from '../utils/errors/app.error'
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey'
import prisma from "../prisma/client";

export const createBookingService = async(payload:CreateBookingDTO)=>{

    const booking = await createBooking({
      ...payload,
        totalGuests:1,
         
    })
    const idempotencyKey = generateIdempotencyKey()
    await createIdempotencyKey(idempotencyKey,booking.id)

    return {bookingId:booking.id ,idempotencyKey}
}


export const confirmBookingService = async(idempotencyKey:string)=>{

    return await prisma.$transaction(async(tx)=>{

        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx,idempotencyKey)
        if(idempotencyKeyData.finalize){
            throw new BadRequestError('Booking already finalized')
        }
        const booking = await confirmBooking(tx,idempotencyKeyData.bookingId)
        await finalizeIdempotencyKey(idempotencyKey)
    
        return booking;
    })

}