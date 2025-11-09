import { createHotelDto } from "../dto/hotel.dto";
import { createHotel, getHotelById } from "../repositories/hotel.repository";

export const createHotelService=async(hotelData:createHotelDto)=>{
    const hotel = await createHotel(hotelData);
    return hotel;
}
export const getHotelService=async(id:number)=>{
    const hotel = await getHotelById(id);
    return hotel;
}