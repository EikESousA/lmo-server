import { NextFunction, Request, Response } from 'express';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@repositories/implementations/Users/UsersRepository';

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { id } = request.user;

	const usersRepository = new UsersRepository();
	const user = await usersRepository.findById({ id });

	if (user.level !== 0) {
		throw new AppError('Usuário não é admnistrador');
	}

	return next();
}
