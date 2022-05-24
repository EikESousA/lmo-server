import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@configs/auth';
import { Store } from '@entities/Store/Store';
import { User } from '@entities/User/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	data: { user: User; token: string; store: Store | undefined };
	message: string;
}

@injectable()
class SessionService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
		@inject('StoresRepository')
		private StoresRepository: IStoresRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail({
			email,
			select: [
				'id',
				'name',
				'password',
				'email',
				'phone',
				'avatar',
				'level',
				'activate',
			],
		});

		if (!user) {
			log(`❌ Usuário incorreto - EMAIL: ${email}`);
			throw new AppError('Usuário ou e-mail incorreto!', 400);
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			log(`❌ Senha incorreta - EMAIL: ${email}`);
			throw new AppError('Usuário ou e-mail incorreto!', 400);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		user.avatarUrl = user.getAvatar_URL();

		delete user.avatar;
		delete user.password;

		const store = undefined;

		log(`🧑 Usuário conectado - EMAIL: ${email}`);

		return {
			data: { user, token, store },
			message: 'Usuário conectado com sucesso!',
		};
	}
}

export { SessionService };
