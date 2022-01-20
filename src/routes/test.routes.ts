import { Router, Request, Response } from 'express';

const testRoutes = Router();

testRoutes.get('/', (request: Request, response: Response) => {
	response.json({ text: 'hello word' });
});

export { testRoutes };
