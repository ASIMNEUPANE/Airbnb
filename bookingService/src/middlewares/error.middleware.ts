import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    if (err?.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    next(err);
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    logger.error(err.message)
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}