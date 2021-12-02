import { Router, Request, Response } from 'express';

import { UsersRepository } from '../repositories/UsersRepository';

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post('/', (request: Request, response: Response): Response => {
	const { name, email, password } = request.body;

	const userAlreadyExists = usersRepository.findByName(name);

	if (userAlreadyExists) {
		return response.status(400).json({ error: 'Usuário já existe' });
	}

	const user = usersRepository.create({ name, email, password });

	return response.status(201).json(user);
});

usersRoutes.get('/', (request: Request, response: Response): Response => {
	const users = usersRepository.list();

	return response.status(200).json(users);
});

export default usersRoutes;
