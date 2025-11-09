import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDto } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export const createHotel = (hotelData:createHotelDto)=>{
    const hotel = Hotel.create({
        ...hotelData
    })
    logger.info(`Hotel created with id: ${hotel}`);
    return hotel;

}
export const getHotelById = async(id:number)=>{
    const hotel = await Hotel.findByPk(id);
    if(!hotel){
        logger.warn(`Hotel not found with id: ${id}`);
        throw new NotFoundError('Hotel not found');
    }
    logger.info(`Hotel fetched with id: ${id}`);
    return hotel;
}