import express from 'express';
import { createBookingHandler,confirmBookingHandler } from '../../controllers/booking.controller';
import {  validateRequestBody, validateParams } from '../../validators';
import {createBookingSchema}  from '../../validators/booking.validator';
import {  uuidSchema } from '../../validators/common.validator';

const bookingRouter = express.Router();

bookingRouter.post('/',validateRequestBody(createBookingSchema), createBookingHandler);
bookingRouter.put('/confirm/:idempotencyKey',validateParams(uuidSchema),confirmBookingHandler );


export default bookingRouter;