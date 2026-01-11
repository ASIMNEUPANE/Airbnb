import { Prisma,IdempotencyKey } from "../generated/prisma/client";
import {BookingStatus} from "../generated/prisma/enums"
import prisma from "../lib/prisma";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { validate as isValidUUID } from "uuid";

export const createBooking = async (bookingInput:Prisma.BookingCreateInput) => {
    const booking = await prisma.booking.create({
        data:{
            ...bookingInput,
        }
    })
    return booking
};

export const createIdempotencyKey = async(key:string,bookingId:number)=>{

    const idempotencyKey =await prisma.idempotencyKey.create({
        data:{
     idemKey:key,
     booking:{
        connect:{
            id:bookingId
        }
     }    
        },
    
    })
    return idempotencyKey
}

export const getIdempotencyKeyWithLock = async(tx:Prisma.TransactionClient,keys:string)=>{

  if(!isValidUUID(keys)){
        throw new BadRequestError('Invalid idempotency key')
    }
    console.log('Acquiring lock for Idempotency Key:', keys);
    const idempotencyKey:Array<IdempotencyKey> = await tx.$queryRaw
        `SELECT * FROM IdempotencyKey WHERE idemKey = ${keys} FOR UPDATE`
        
    console.log('Idempotency Key with Lock:', idempotencyKey);
    if(!idempotencyKey || idempotencyKey.length === 0){
        throw new NotFoundError('Idempotency key not found')
    }
    return idempotencyKey[0];
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
export const confirmBooking =(tx:Prisma.TransactionClient,bookingId:number)=>{
   const booking = tx.booking.update({
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

export const finalizeIdempotencyKey = async(tx:Prisma.TransactionClient,key:string)=>{
    const idempotencyKey = await tx.idempotencyKey.update({
        where:{
            idemKey:key
        },
        data:{
            finalize:true
        }
    })
    return idempotencyKey
}

// state design pattern
