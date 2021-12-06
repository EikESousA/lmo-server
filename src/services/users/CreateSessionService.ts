import 'reflect-metadata';

import authConfig from '@configs/auth';
import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
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
class CreateSessionService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Usuário ou e-mail incorreto!', 401);
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			throw new AppError('Usuário ou e-mail incorreto!', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		return { user, token };
	}
}

export { CreateSessionService };
