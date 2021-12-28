import 'reflect-metadata';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	userId: string;
}

@injectable()
class ShowService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ userId }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não encontrado!');
		}

		log(`🧑 Usuário encontrado - EMAIL: ${user.email}`);

		return user;
	}
}

export { ShowService };
