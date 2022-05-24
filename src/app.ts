/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@providers/index';
import '@repositories/index';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import repositoryConfig from '@configs/repository';
import createConnection from '@databases/index';
import { AppError } from '@errors/AppError';
import rateLimiter from '@middlewares/rateLimiter';
import { routes } from '@routes/index.routes';
import { staticRoutes } from '@routes/static.routes';

if (repositoryConfig.repository === 'db') {
	createConnection();
}

const app = express();

if (repositoryConfig.repository === 'db') {
	app.use(rateLimiter);
}

app.use(express.json());

app.use(staticRoutes);

app.use(cors());
app.use(routes);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				message: err.message,
				data: null,
			});
		}

		return response.status(500).json({
			status: 'error',
			message: `Internal server error - ${err.message} `,
		});
	},
);

export { app };
