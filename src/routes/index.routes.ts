import { Router, Request, Response } from 'express';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

routes.get('/test', (request: Request, response: Response) => {
	console.log('TESTE');
	response.json({ text: 'hello word' });
});

export { routes };
