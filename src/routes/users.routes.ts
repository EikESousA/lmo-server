import { Router, Request, Response } from 'express';

import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserService } from '../services/CreateUserService';

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post(
	'/create',
	(request: Request, response: Response): Response => {
		const { name, email, password } = request.body;

		try {
			const createUserService = new CreateUserService(usersRepository);

			const user = createUserService.execute({ name, email, password });

			return response.status(201).json({ user });
		} catch (error) {
			return response.status(error.statusCode).json({ error: error.message });
		}
	},
);

usersRoutes.post(
	'/session',
	(request: Request, response: Response): Response => {
		const { email, password } = request.body;

		const users = usersRepository.createSession({
			email,
			password,
		});

		if (!users) {
			return response
				.status(406)
				.json({ error: 'E-mail ou senha incorretos!' });
		}

		return response.status(200).json(users);
	},
);

export { usersRoutes };
