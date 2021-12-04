import 'reflect-metadata';

import AppError from '@errors/AppError';
import { User } from '@models/User';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError('Usuário já existe!', 400);
		}

		const user = this.usersRepository.create({ name, email, password });

		return user;
	}
}

export { CreateUserService };
