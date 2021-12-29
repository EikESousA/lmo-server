/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@databases/index';
import '@providers/index';
import '@repositories/index';

import uploadConfig from '@configs/upload';
import { AppError } from '@errors/AppError';
import { routes } from '@routes/index.routes';
import { log } from '@utils/log';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const assetsFolder = path.resolve(__dirname, 'assets');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/assets', express.static(assetsFolder));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/products', express.static(`${uploadConfig.tmpFolder}/produtos`));

app.use(routes);

app.use(
	(err: Error, request: Request, response: Response, _next: NextFunction) => {
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
	if (process.env.APP_ENV === 'development') {
		process.stdout.write('\x1Bc');
	}

	log('🌎 Server iniciado - PORTA: 3333');
});
