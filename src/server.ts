/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@databases/index';
import '@providers/index';
import '@repositories/index';

import { AppError } from '@errors/AppError';
import { routes } from '@routes/index.routes';
import { log } from '@utils/log';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
	(
		err: Error,
		request: express.Request,
		response: express.Response,
		_next: express.NextFunction,
	) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				message: err.message,
			});
		}

		return response.status(500).json({
			status: 'error',
			message: `Internal server error - ${err.message} `,
		});
	},
);

app.listen(3333, () => {
	log('🌎 Server iniciado - PORTA: 3333');
});
