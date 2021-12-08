import uploadConfig from '@configs/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { UsersController } from 'controllers/UsersController';
import { Router } from 'express';
import multer from 'multer';

const usersRoutes = Router();

const upload = multer(uploadConfig.multer);

const usersController = new UsersController();

usersRoutes.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	usersController.avatar,
);
usersRoutes.post('/create', usersController.create);
usersRoutes.post('/forgot', usersController.forgot);
usersRoutes.post('/reset', usersController.reset);
usersRoutes.post('/session', usersController.session);
usersRoutes.post('/show', ensureAuthenticated, usersController.show);
usersRoutes.put('/update', ensureAuthenticated, usersController.update);

export { usersRoutes };
