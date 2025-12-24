import {  Response } from "express";
import { StatusCodes } from "http-status-codes";

// Generic success response function
export const successResponse = <T = any>(
  res: Response,
  data: T,
  message: string,
  statusCode: StatusCodes.OK | StatusCodes.CREATED = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

// Reusable create success (201)
export const createSuccessResponse = <T>(
  res: Response,
  data: T,
  message: string
) => {
  successResponse(res, data, message, StatusCodes.CREATED);
};

