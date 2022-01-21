import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';
import { UsersController } from '@controllers/UsersController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import UsersValidator from '@validators/UsersValidator';

const usersRoutes = Router();

const upload = multer(uploadConfig.multer);

const usersController = new UsersController();

usersRoutes.post('/create', UsersValidator.create, usersController.create);
usersRoutes.post('/forgot', UsersValidator.forgot, usersController.forgot);
usersRoutes.post('/reset', UsersValidator.reset, usersController.reset);
usersRoutes.post('/session', UsersValidator.session, usersController.session);
usersRoutes.post(
	'/activate',
	UsersValidator.activate,
	usersController.activate,
);

usersRoutes.post(
	'/show',
	ensureAuthenticated,
	UsersValidator.show,
	usersController.show,
);
usersRoutes.put(
	'/update',
	ensureAuthenticated,
	UsersValidator.update,
	usersController.update,
);
usersRoutes.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	UsersValidator.avatar,
	usersController.avatar,
);

usersRoutes.get(
	'/list',
	ensureAuthenticated,
	ensureAdmin,
	UsersValidator.list,
	usersController.list,
);

export { usersRoutes };
