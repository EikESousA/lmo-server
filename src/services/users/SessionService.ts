import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@configs/auth';
import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	data: { user: User; token: string };
	message: string;
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

		user.avatar_url = user.getAvatar_URL();

		delete user.password;
		delete user.avatar;
		delete user.activate;
		delete user.created_at;
		delete user.updated_at;

		log(`🧑 Usuário conectado - EMAIL: ${email}`);

		return { data: { user, token }, message: 'Usuário conectado com sucesso!' };
	}
}

export { SessionService };
