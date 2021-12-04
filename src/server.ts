/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';

import AppError from '@errors/AppError';
import routes from '@routes/index.routes';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import '@repositories/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message,
			});
		}
		console.error(err);
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => {
	console.log('🚀 Server started on port 3333!');
});
