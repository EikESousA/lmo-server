import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';
import { StoresController } from '@controllers/StoresController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import StoresValidator from '@validators/StoresValidator';

const storesRoutes = Router();

const upload = multer(uploadConfig.multer);

const storesController = new StoresController();

storesRoutes.post(
	'/create',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.create,
	storesController.create,
);
storesRoutes.post(
	'/show',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.show,
	storesController.show,
);
storesRoutes.get(
	'/list',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.list,
	storesController.list,
);
storesRoutes.post(
	'/link',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.link,
	storesController.link,
);
storesRoutes.post(
	'/disable',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.disable,
	storesController.disable,
);
storesRoutes.post(
	'/update',
	ensureAuthenticated,
	ensureAdmin,
	StoresValidator.update,
	storesController.update,
);
storesRoutes.post(
	'/avatar',
	ensureAuthenticated,
	ensureAdmin,
	upload.single('avatar'),
	StoresValidator.avatar,
	storesController.avatar,
);

export { storesRoutes };
