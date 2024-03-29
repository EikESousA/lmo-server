import 'reflect-metadata';

import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	token: string;
}

interface IResponse {
	data: null;
	message: string;
}

@injectable()
class ActivateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('TokensRepository')
		private tokensRepository: ITokensRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token }: IRequest): Promise<IResponse> {
		const sessions = await this.tokensRepository.findByToken(token);

		if (!sessions || sessions.info === 0) {
			log(`❌ Token incorreto`);
			throw new AppError('Token do usuário incorreto!');
		}

		const user = await this.usersRepository.findById({ id: sessions.user_id });

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não existe!');
		}

		const tokenCreatedAt = sessions.created_at;
		const compareDate = addHours(tokenCreatedAt, 24);

		if (isAfter(Date.now(), compareDate)) {
			log(`❌ Token expirado`);
			throw new AppError('Token expirado!');
		}

		user.activate = true;

		await this.usersRepository.save(user);
		await this.tokensRepository.delete(sessions);

		log(`🧑 Usuário ativado - EMAIL: ${user.email}`);

		return { data: null, message: 'Usuário ativado com sucesso!' };
	}
}

export { ActivateService };
