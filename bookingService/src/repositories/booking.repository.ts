import { Prisma } from "../generated/prisma/client";
import {BookingStatus} from "../generated/prisma/enums"
import prisma from "../prisma/client";
import { NotFoundError } from "../utils/errors/app.error";

export const createBooking = async (bookingInput:Prisma.BookingCreateInput) => {
    const booking = await prisma.booking.create({
        data: bookingInput
    });
    return booking
};

export const createIdempotencyKey = async(key:string,bookingId:number)=>{

    const idempotencyKey =await prisma.idempotencyKey.create({
        data:{
     key,
     booking:{
        connect:{
            id:bookingId
        }
     }    
        },
    
    })
    return idempotencyKey
}

export const getIdempotencyKey = async(key:string)=>{
    const idempotencyKey = await prisma.idempotencyKey.findUnique({where:{
        key
    }})
    if(!idempotencyKey){
        throw new NotFoundError('Idempotency key not found')
    }
    return idempotencyKey
}

export const getBookingById = async(id:number)=>{
    const booking = await prisma.booking.findUnique({where:{id}})
    if(!booking){
        throw new NotFoundError('Booking not found')
    }
    return booking
}

export const changeBookingStatus =(bookingId:number,status:BookingStatus)=>{
   const booking = prisma.booking.update({
       where:{
        id:bookingId
       },
       data:{
        status
       }
   })
   return booking
}
export const confirmBooking =(bookingId:number)=>{
   const booking = prisma.booking.update({
       where:{
        id:bookingId
       },
       data:{
        status:'CONFIRMED'
       }
   })
   return booking
}

export const cancelBookingStatus =(bookingId:number)=>{
   const booking = prisma.booking.update({
       where:{
        id:bookingId
       },
       data:{
        status:'CANCELLED'
       }
   })
   return booking
}

export const finalizeIdempotencyKey = async(key:string)=>{
    const idempotencyKey = await prisma.idempotencyKey.update({
        where:{
            key
        },
        data:{
            finalize:true
        }
    })
    return idempotencyKey
}

// state design pattern
