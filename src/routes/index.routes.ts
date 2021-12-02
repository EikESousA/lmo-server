/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, Response, Request, NextFunction, Errback } from 'express';

import usersRouters from './users.routes';

const routes = Router();

routes.use('/users', usersRouters);

routes.use(function (
	error: Errback,
	request: Request,
	response: Response,
	next: NextFunction,
) {
	if (error) {
		response.status(400).json();
	} else {
		response.status(200).json();
	}
});

export default routes;
