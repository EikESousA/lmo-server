import { UsersController } from 'controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/create', usersController.create);
usersRoutes.post('/session', usersController.session);

export { usersRoutes };
