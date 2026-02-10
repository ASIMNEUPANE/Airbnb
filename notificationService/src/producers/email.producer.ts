import {mailerOueue} from "../queues/mailer.queue";
import { notificationDto } from "../dto/notification.dto";

export const MAILER_PAYLOAD ='payload:email'

export const addEmailToQueue = async (payload:notificationDto)=>{
    await mailerOueue.add(MAILER_PAYLOAD,payload,
        {
            attempts:3,
            backoff:{
                type:'exponential',
                delay:1000
            }
        }
    )
    console.log(payload,'payload')
}