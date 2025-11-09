import { NextFunction, Request, Response } from "express";
import { createHotelService, getHotelService } from "../services/hotel.service";

export const createHotelHandler =async(req:Request,res:Response,next:NextFunction)=>{

    const hotelResponse = await createHotelService(req.body);
    res.status(201).json({
        success:true,
        data:hotelResponse,
        message:'Hotel created successfully',
    });
}

export const getHotelHandler=async(req:Request,res:Response,next:NextFunction)=>{
    const hotelResponse = await getHotelService(Number(req.params.id));
    res.status(200).json({
        message:'Hotel fetched successfully',
        data:hotelResponse,
        success:true,
    });
}
