import Redis from 'ioredis';

const connectionToRedis = ()=>{
    try {
        let connection:Redis;
        return ()=>{
            if(!connection){
                connection = new Redis({
                    port:6379,
                    host:"redis"
                }
            )
            return connection;
            }
        }
    } catch (error) {
        throw error
    }
}
export const getRedisConnectionObject = connectionToRedis();