import { Router } from 'express';

import { storesRoutes } from './stores.routes';
import { testRoutes } from './test.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/store', storesRoutes);
routes.use('/test', testRoutes);

export { routes };
