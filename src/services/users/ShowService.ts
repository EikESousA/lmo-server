import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	userId: string;
}

interface IResponse {
	data: User;
	message: string;
}

@injectable()
class ShowService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ userId }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não encontrado!');
		}

		user.avatar_url = user.getAvatar_URL();

		delete user.password;
		delete user.avatar;
		delete user.activate;
		delete user.created_at;
		delete user.updated_at;

		log(`🧑 Usuário encontrado - EMAIL: ${user.email}`);

		return { data: user, message: 'Usuário encontrado com sucesso!' };
	}
}

export { ShowService };
