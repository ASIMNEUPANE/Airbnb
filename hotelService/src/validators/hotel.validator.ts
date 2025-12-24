import {z} from 'zod';

export const hotelSchema=z.object({
    name:z.string().min(3),
    address:z.string().min(10),
    location:z.string().min(3),
    rating:z.number().min(0).max(5).optional(),
    ratingCount:z.number().min(0).optional(),
})
export const updateHotelSchema=hotelSchema.partial();