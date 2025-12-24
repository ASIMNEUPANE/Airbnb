import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { paginateDto } from "../dto/common.dto";
import { createHotelDto, updateHotelDto } from "../dto/hotel.dto";
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

export const getAllHotels = async(getAllHotelsData:paginateDto)=>{
    const hotels = await Hotel.findAll({
       where:{
        deletedAt: null ,        
       }
    });
    if(!hotels || hotels.length === 0){
        logger.warn(`No hotels found in the database`);
        throw new NotFoundError('No hotels found');
    }

    logger.info(`Fetched all hotels, count: ${hotels.length}`);
    return hotels;
}

export const deleteHotelById = async(id:number)=>{
    const hotel = await getHotelById(id);
    await hotel.update({
        deletedAt: new Date()
    });
    logger.info(`Hotel deleted with id: ${id}`);
    return;
}

export const updateHotelById = async(id:number,hotelData:Partial<updateHotelDto>)=>{
    const hotel = await getHotelById(id);
    await hotel.update({
        ...hotelData
    });
    logger.info(`Hotel updated with id: ${id}`);
    return hotel;
}