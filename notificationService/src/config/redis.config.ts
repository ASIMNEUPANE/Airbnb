import Redis, { RedisOptions } from "ioredis";

const redisConfig: RedisOptions = {
  port: 6379,
  host: "127.0.0.1",
  maxRetriesPerRequest: null,
};

let connection: Redis | null = null;

export const getRedisConnectionObject = (): Redis => {
  if (!connection) {
    connection = new Redis(redisConfig);
  }
  return connection;
};
