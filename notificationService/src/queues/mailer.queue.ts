import { Queue } from "bullmq";
import { getRedisConnectionObject } from "../config/redis.config";

const MAILER_QUEUE='queue:mailer';

export const mailerOueue = new Queue(MAILER_QUEUE,{
    connection:getRedisConnectionObject(),
})