import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
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

	public async execute({ id }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById({
			id,
			select: ['id', 'name', 'email', 'phone', 'avatar', 'level', 'activate'],
		});

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não encontrado!');
		}

		user.avatar_url = user.getAvatar_URL();

		delete user.avatar;

		log(`🧑 Usuário encontrado - EMAIL: ${user.email}`);

		return { data: user, message: 'Usuário encontrado com sucesso!' };
	}
}

export { ShowService };
