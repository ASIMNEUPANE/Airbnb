import { Queue } from "bullmq";
import { getRedisConnectionObject } from "../config/redis.config";

export const MAILER_QUEUE='mailer';

export const mailerOueue = new Queue(MAILER_QUEUE,{
    connection:getRedisConnectionObject(),
    
})

