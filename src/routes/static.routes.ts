import express, { Router } from 'express';
import path from 'path';

import uploadConfig from '@configs/upload';

const staticRoutes = Router();

const assetsFolder = path.resolve(__dirname, 'assets');
const avatarFolder = path.join(uploadConfig.tmpFolder, 'avatar');
const productsFolder = path.join(uploadConfig.tmpFolder, 'products');

staticRoutes.use('/assets', express.static(assetsFolder));
staticRoutes.use('/avatar', express.static(avatarFolder));
staticRoutes.use('/products', express.static(productsFolder));

export { staticRoutes };
