/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@providers/index';
import '@repositories/index';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

import uploadConfig from '@configs/upload';
import createConnection from '@databases/index';
import { AppError } from '@errors/AppError';
import { routes } from '@routes/index.routes';

const assetsFolder = path.resolve(__dirname, 'assets');

createConnection();
const app = express();

app.use(cors());

app.use(express.json());

app.use('/assets', express.static(assetsFolder));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/products', express.static(`${uploadConfig.tmpFolder}/produtos`));

app.use(routes);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
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

export { app };
