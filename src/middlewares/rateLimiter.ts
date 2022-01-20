import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@errors/AppError';

export default async function rateLimiter(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const redisClient = redis.createClient({
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
	});

	const limiter = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: 'rateLimiter',
		points: 5,
		duration: 1,
	});
	try {
		await limiter.consume(request.ip);

		return next();
	} catch (err) {
		throw new AppError('Muitas requisições', 429);
	}
}
