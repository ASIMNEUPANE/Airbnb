import logger from "../config/logger.config";
import { Prisma,IdempotencyKey } from "../generated/prisma/client";
import {BookingStatus} from "../generated/prisma/enums"
import prisma from "../lib/prisma";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { validate as isValidUUID } from "uuid";

export const createBooking = async (bookingInput:Prisma.BookingCreateInput) => {
    logger.info('Creating booking with input:', bookingInput);
    const booking = await prisma.booking.create({
        data:{
            ...bookingInput,
        }
    })
    logger.info('Booking created:', booking);
    if(!booking){
        throw new BadRequestError('Failed to create booking')
    }
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

export const getIdempotencyKeyWithLock = async(tx:Prisma.TransactionClient,key:string)=>{

  if(!isValidUUID(key)){
        throw new BadRequestError('Invalid idempotency key')
    }
    const idempotencyKey:Array<IdempotencyKey> = await tx.$queryRaw
        `SELECT * FROM "IdempotencyKey" WHERE key = ${key} FOR UPDATE`
        
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
            key
        },
        data:{
            finalize:true
        }
    })
    return idempotencyKey
}

// state design pattern
