/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';

import uploadConfig from '@configs/upload';
import { routes } from '@routes/index.routes';
import { log } from '@utils/log';
import cors from 'cors';
import express from 'express';
import path from 'path';
import '@repositories/index';
import '@providers/index';

const assetsFolder = path.resolve(__dirname, '..', 'assets');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/assets', express.static(assetsFolder));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));

app.use(routes);

app.listen(3333, () => {
	log('🌎 Server iniciado - PORTA: 3333');
});
