import express from 'express';
import { serverConfig } from './config';
import router from './routers';
import {appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { setupMailerWorker } from './processors/email.processor';
import { notificationDto } from './dto/notification.dto';
import { addEmailToQueue } from './producers/email.producer';
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/', router);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    setupMailerWorker()
    logger.info('Mailer worker setup completed')
    logger.info(`Press Ctrl+C to stop the server.`);
    const sampleNotification :notificationDto={
        subject:'sample subj',
        to:'sample to',
        templateId:'sample template',
        params:{name:'sample name'}
    }
    addEmailToQueue(sampleNotification)
});
