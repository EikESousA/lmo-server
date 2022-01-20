import 'reflect-metadata';

import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';
import { log } from '@utils/log';

interface IRequest {
	token: string;
	password: string;
}

interface IResponse {
	data: null;
	message: string;
}
@injectable()
class ResetService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('UsersTokenRepository')
		private usersTokensRepository: IUsersTokenRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<IResponse> {
		const userToken = await this.usersTokensRepository.findByToken(token);

		if (!userToken) {
			log(`❌ Token incorreto`);
			throw new AppError('Token do usuário incorreto!');
		}

		const user = await this.usersRepository.findById(userToken.user_id);

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não existe!');
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			log(`❌ Token expirado`);
			throw new AppError('Token expirado!');
		}

		user.password = await this.hashProvider.generateHash(password);

		log(`🧑 Usuário resetou senha - EMAIL: ${user.email}`);

		await this.usersRepository.save(user);

		await this.usersTokensRepository.deleteUserToken(userToken);

		return { data: null, message: 'Senha alterada com sucesso!' };
	}
}

export { ResetService };
