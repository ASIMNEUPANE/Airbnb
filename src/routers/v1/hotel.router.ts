import express from 'express';
import { createHotelHandler,getHotelHandler } from '../../controllers/hotel.controller';
import { validateParams, validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';
import { idSchema } from '../../validators/common.validator';
// import {  validateRequestBody } from '../../validators';
// import { pingSchema } from '../../validators/ping.validator';

const hotelRouter = express.Router();

hotelRouter.post('/',validateRequestBody(hotelSchema), createHotelHandler);

hotelRouter.get('/:id',validateParams(idSchema),getHotelHandler)

export default hotelRouter;