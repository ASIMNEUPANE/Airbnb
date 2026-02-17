import {mailerOueue} from "../queues/mailer.queue";
import { notificationDto } from "../dto/notification.dto";
import { log } from "console";

export const MAILER_PAYLOAD ='payload:email'

export const addEmailToQueue = async (payload:notificationDto)=>{
    log('Adding email job to queue:',payload);
    await mailerOueue.add(MAILER_PAYLOAD,payload,
        {
            attempts:3,
            backoff:{
                type:'exponential',
                delay:1000
            }
        }
    )
}