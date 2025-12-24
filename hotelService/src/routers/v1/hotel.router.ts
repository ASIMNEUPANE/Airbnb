import express from 'express';
import { createHotelHandler,getHotelHandler,deleteHotelHandler,getAllHotelsHandler,updateHotelHandler } from '../../controllers/hotel.controller';
import { validateParams, validateRequestBody } from '../../validators';
import { hotelSchema,updateHotelSchema } from '../../validators/hotel.validator';
import { idSchema } from '../../validators/common.validator';

const hotelRouter = express.Router();

hotelRouter.post('/',validateRequestBody(hotelSchema), createHotelHandler);

hotelRouter.get('/',getAllHotelsHandler);
hotelRouter.get('/:id',validateParams(idSchema),getHotelHandler)


hotelRouter.put('/:id',validateParams(idSchema),validateRequestBody(updateHotelSchema),updateHotelHandler);
hotelRouter.delete('/:id',validateParams(idSchema),deleteHotelHandler);


export default hotelRouter;