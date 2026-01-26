import ioredis from 'ioredis';
import RedLock from 'redlock';
import { serverConfig } from '.';


export const redisClient = new ioredis(serverConfig.REDIS_SERVER_URL!);

export const redLock = new RedLock([redisClient],{
    driftFactor:0.01,
    retryCount:10,
    retryDelay:100,
    retryJitter:200,
})