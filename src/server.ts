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

const app = express();
const assetsFolder = path.resolve(__dirname, '..', '..', 'tmp');

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolde));
app.use('/assets', express.static(uploadConfig.uploadsFolde));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));

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
	log('🌎 Server iniciado - PORTA: 3333');
});
