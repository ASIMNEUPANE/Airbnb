import { createHotelDto } from "../dto/hotel.dto";
import { createHotel, deleteHotelById, getAllHotels, getHotelById, updateHotelById } from "../repositories/hotel.repository";
import { ConflictError } from "../utils/errors/app.error";
// import { NotFoundError } from "../utils/errors/app.error";

export const createHotelService=async(hotelData:createHotelDto)=>{
    const hotel = await createHotel(hotelData);
    return hotel;
}
export const getHotelService=async(id:number)=>{
    const hotel = await getHotelById(id);


    return hotel;
}

export const getAllHotelsService=async()=>{
    const hotels = await getAllHotels({});
    return hotels;
}
export const updateHotelService=async(id:number,hotelData:Partial<createHotelDto>)=>{
    const hotel = await updateHotelById(id,hotelData);
    return hotel;
}
export const deleteHotelService=async(id:number)=>{
    const hotel = await getHotelById(id);
    if(hotel.deletedAt){
        throw new ConflictError('Hotel already deleted');
    }

    await deleteHotelById(id);
    return;
}