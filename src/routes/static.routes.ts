import express, { Router } from 'express';
import path from 'path';

import uploadConfig from '@configs/upload';

const staticRoutes = Router();

const assetsFolder = path.resolve(__dirname, 'assets');
const userFolder = path.join(uploadConfig.tmpFolder, 'user');
const productFolder = path.join(uploadConfig.tmpFolder, 'product');
const storeFolder = path.join(uploadConfig.tmpFolder, 'store');

staticRoutes.use('/assets', express.static(assetsFolder));
staticRoutes.use('/user', express.static(userFolder));
staticRoutes.use('/product', express.static(productFolder));
staticRoutes.use('/store', express.static(storeFolder));

export { staticRoutes };
