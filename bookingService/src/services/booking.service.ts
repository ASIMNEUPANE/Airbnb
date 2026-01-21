import { CreateBookingDTO } from '../dto/booking.dto'
import {confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock} from '../repositories/booking.repository'
import { BadRequestError } from '../utils/errors/app.error'
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey'
import prisma from "../lib/prisma";
import { redLock } from '../config/redis.config';
import { serverConfig } from '../config';


export const createBookingService = async(payload:CreateBookingDTO)=>{
   const bookingResource = `hotel:${payload.hotelId}-user:${payload.userId}`;
   return await redLock.using([bookingResource],serverConfig.LOCK_TTL,async()=>{
console.log("Startttt")
      const booking = await createBooking({
       ...payload        
    })
    console.log("hiiiiiiiiiii")
    const idempotencyKey = generateIdempotencyKey()
    console.log("Heloooooo")
    await createIdempotencyKey(idempotencyKey,booking.id)
    console.log("Whatsupp")
    console.log({bookingId:booking.id ,idempotencyKey})
    return {bookingId:booking.id ,idempotencyKey}
   })
   
  
}

export const confirmBookingService = async(idempotencyKey:string)=>{

    return await prisma.$transaction(async(tx)=>{

        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx,idempotencyKey)
        if(idempotencyKeyData.finalize){
            throw new BadRequestError('Booking already finalized')
        }
        const booking = await confirmBooking(tx,idempotencyKeyData.bookingId)
        await finalizeIdempotencyKey(tx,idempotencyKey)
    
        return booking;
    })

}