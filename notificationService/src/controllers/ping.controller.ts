import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import fs from 'fs/promises'
import {  NotFoundError } from "../utils/errors/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Ping request received");
    try{
        await fs.readFile("sample")

        res.status(200).json({ message: "Pong!" });
    }catch(error){
        throw new NotFoundError("File not found")
    }
}

// 1. have some unique id generator

// 2. put the id in the current request 