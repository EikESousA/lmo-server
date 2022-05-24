import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';
import { StoresController } from '@controllers/StoresController';
import StoresValidator from '@validators/StoresValidator';

const storesRoutes = Router();

const upload = multer(uploadConfig.multer);

const storesController = new StoresController();

storesRoutes.post('/create', StoresValidator.create, storesController.create);
storesRoutes.post('/show', StoresValidator.show, storesController.show);
storesRoutes.post('/list', StoresValidator.list, storesController.list);

storesRoutes.post(
	'/activate',
	StoresValidator.activate,
	storesController.activate,
);
storesRoutes.post('/update', StoresValidator.update, storesController.update);
storesRoutes.post(
	'/avatar',
	upload.single('avatar'),
	StoresValidator.avatar,
	storesController.avatar,
);
storesRoutes.post('/address', storesController.address);

export { storesRoutes };
