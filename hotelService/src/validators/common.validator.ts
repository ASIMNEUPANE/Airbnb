import {z} from 'zod';

export const idSchema=z.object({
   id:z.string()
   .transform((val)=>parseInt(val,10))
   .refine((val)=>!isNaN(val)&&val>0,{message:"ID must be a positive integer"})
})