import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
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
			throw new AppError('Usuário não encontrado!');
		}

		return user;
	}
}

export { ShowService };
