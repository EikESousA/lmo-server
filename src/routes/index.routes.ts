import { Router } from 'express';

import { testRoutes } from './test.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/test', testRoutes);

export { routes };
