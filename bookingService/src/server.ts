import express,{ErrorRequestHandler} from 'express';
import { serverConfig } from './config';
import router from './routers';
import {appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import prisma from './lib/prisma';
// import { setupMailerWorker } from './processors/email.processor';
import { addEmailToQueue } from './producers/email.producer';
import { notificationDto } from './dto/notification.dto';
const app = express();


app.use(express.json());


prisma.$connect().then(() => {
    logger.info('Connected to the database successfully.');
}).catch((error) => {
    logger.error('Database connection error:', error);
    process.exit(1); // Exit the application if the database connection fails
});
/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/', router);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler as ErrorRequestHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    // setupMailerWorker()
    // logger.info('Mailer worker setup completed')
    logger.info(`Press Ctrl+C to stop the server.`);
    const sampleNotification :notificationDto={
        subject:'sample subj from booking service',
        to:'sample to from booking service',
        templateId:'sample template',
        params:{name:'sample name'}
    }
    addEmailToQueue(sampleNotification)});
