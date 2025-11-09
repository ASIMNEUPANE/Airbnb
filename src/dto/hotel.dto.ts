import {z} from 'zod';
import {hotelSchema} from '../validators/hotel.validator';


export type createHotelDto = z.infer<typeof hotelSchema>;
export type updateHotelDto = Partial<createHotelDto>;