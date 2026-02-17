import { Job, Worker } from "bullmq";
import { notificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnectionObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { BadRequestError } from "../utils/errors/app.error";

export const setupMailerWorker = ()=>{
 const emailProcessor = new Worker<notificationDto>(
    MAILER_QUEUE, //name of the queue
    async(job:Job)=>{
        if(job.name !==MAILER_PAYLOAD){
            throw new BadRequestError('Invalid job name')
        }
        console.log('Processing email job:',job.data);
        // now call service layer

    },
    {
        connection:getRedisConnectionObject()!
    }
)
emailProcessor.on("failed",()=>{
    console.log('email worker failed')
})
}