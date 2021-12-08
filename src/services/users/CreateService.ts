import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { log } from '@utils/log';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			log(`❌ Usuário já existe - EMAIL: ${email}`);
			throw new AppError('Usuário já existe!', 400);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		log(`🧑 Usuário criado - EMAIL: ${email}`);

		const user = this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export { CreateService };
