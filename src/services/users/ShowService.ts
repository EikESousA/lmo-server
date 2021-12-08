import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
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
