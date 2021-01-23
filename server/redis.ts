import Redis from 'ioredis';
import winston from 'winston';

const client = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
});

client.on('error', (error) => {
    winston.error(error);
    client.quit();
});

client.on('connect', () => winston.info('Redis client connected'));

export default client;
