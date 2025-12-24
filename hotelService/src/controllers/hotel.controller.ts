import { NextFunction, Request, Response } from "express";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelService, updateHotelService,} from "../services/hotel.service";
import { createSuccessResponse, successResponse } from "../utils/response/success.response";

export const createHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const hotelResponse = await createHotelService(req.body);
    createSuccessResponse(res, hotelResponse, "Hotel created successfully");

};

export const getHotelHandler=async(req:Request,res:Response,next:NextFunction)=>{
    const hotelResponse = await getHotelService(Number(req.params.id));
    successResponse(res, hotelResponse, 'Hotel fetched successfully');

}

export const getAllHotelsHandler=async(req:Request,res:Response,next:NextFunction)=>{
    
    const hotelResponse = await getAllHotelsService();
    successResponse(res, hotelResponse, 'All hotels fetched successfully');
}

export const deleteHotelHandler=async(req:Request,res:Response,next:NextFunction)=>{
    await deleteHotelService(Number(req.params.id));
    successResponse(res, null, 'Hotel deleted successfully');
}

export const updateHotelHandler=async(req:Request,res:Response,next:NextFunction)=>{
    const hotelResponse = await updateHotelService(Number(req.params.id),req.body);
    successResponse(res, hotelResponse, 'Hotel updated successfully');
}
