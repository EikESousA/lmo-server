import 'reflect-metadata';

import authConfig from '@configs/auth';
import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
class SessionService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			log(`❌ Usuário incorreto - EMAIL: ${email}`);
			throw new AppError('Usuário ou e-mail incorreto!', 401);
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			log(`❌ Senha incorreta - SENHA: ${password}`);
			throw new AppError('Usuário ou e-mail incorreto!', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		log(`🧑 Usuário conectado - EMAIL: ${email}`);

		return { user, token };
	}
}

export { SessionService };
