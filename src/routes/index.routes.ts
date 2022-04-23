import { Router } from 'express';

import { addressesRoutes } from './addresses.routes';
import { storesRoutes } from './stores.routes';
import { testRoutes } from './test.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/stores', storesRoutes);
routes.use('/addresses', addressesRoutes);
routes.use('/test', testRoutes);

export { routes };
