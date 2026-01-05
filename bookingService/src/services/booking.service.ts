import {confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKey} from '../repositories/booking.repository'
import { BadRequestError } from '../utils/errors/app.error'
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey'

export const createBookingService = async(userId:number,hotelId:number,totalGuests:number,amount:number)=>{

    const booking = await createBooking({
        userId,
        amount,
        hotelId,
        totalGuests:1,
         
    })
    const idempotencyKey = generateIdempotencyKey()
    await createIdempotencyKey(idempotencyKey,booking.id)

    return {bookingId:booking.id ,idempotencyKey}
}


export const finalizeBookingService = async(idempotencyKey:string)=>{
    const idempotencyKeyData = await getIdempotencyKey(idempotencyKey)
    if(idempotencyKeyData.finalize){
        throw new BadRequestError('Booking already finalized')
    }
    const booking = await confirmBooking(idempotencyKeyData.bookingId)
    await finalizeIdempotencyKey(idempotencyKey)

    return booking;

}