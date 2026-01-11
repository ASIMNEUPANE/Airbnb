import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { createBookingService,confirmBookingService } from "../services/booking.service";
import { successResponse } from "../utils/response/success.response";

export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Create booking request received");
       const booking = await createBookingService(req.body);
       successResponse(res, booking, 'Booking created successfully',201);
}

export const confirmBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Confirm booking request received");
      const booking= await confirmBookingService(req.params.idempotencyKey);
       successResponse(res, booking, 'Booking confirmed successfully',200);
}

export const cancelBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Cancel booking request received");
       // Implementation for canceling a booking goes here
       successResponse(res, null, 'Booking canceled successfully',200);
}