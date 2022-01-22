import 'reflect-metadata';

import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
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
		@inject('SessionsRepository')
		private sessionsRepository: ISessionsRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<IResponse> {
		const session = await this.sessionsRepository.findByToken(token);

		if (!session) {
			log(`❌ Token incorreto`);
			throw new AppError('Token do usuário incorreto!');
		}

		const user = await this.usersRepository.findById({
			id: session.user_id,
			select: ['id', 'password', 'email'],
		});

		if (!user) {
			log(`❌ Usuário não existe`);
			throw new AppError('Usuário não existe!');
		}

		const tokenCreatedAt = session.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			log(`❌ Token expirado`);
			throw new AppError('Token expirado!');
		}

		user.password = await this.hashProvider.generateHash(password);

		log(`🧑 Usuário resetou senha - EMAIL: ${user.email}`);

		await this.usersRepository.save(user);

		await this.sessionsRepository.delete(session);

		return { data: null, message: 'Senha alterada com sucesso!' };
	}
}

export { ResetService };
