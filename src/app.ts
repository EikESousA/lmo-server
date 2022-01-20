/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@providers/index';
import '@repositories/index';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import createConnection from '@databases/index';
import { AppError } from '@errors/AppError';
import rateLimiter from '@middlewares/rateLimiter';
import { routes } from '@routes/index.routes';
import { staticRoutes } from '@routes/static.routes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],

	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(staticRoutes);

app.use(cors());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

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
