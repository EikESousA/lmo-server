/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { routes } from '@routes/index.routes';
import { log } from '@utils/log';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import '@repositories/index';
import '@providers/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
	log('🌎 Server iniciado - PORTA: 3333');
});
