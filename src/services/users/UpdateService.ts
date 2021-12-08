import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { log } from '@utils/log';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	userId: string;
	name: string;
	email: string;
	password?: string;
	oldPassword?: string;
}

@injectable()
class UpdateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		userId,
		name,
		email,
		password,
		oldPassword,
	}: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			log(`❌ Usuário não autenticado`);
			throw new AppError('Usuário não autenticado!');
		}

		const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
			log(`❌ E-mail utilizado`);
			throw new AppError('E-mail já está sendo utilizado!');
		}

		user.name = name;
		user.email = email;

		if (password && !oldPassword) {
			log(`❌ Antiga senha vazia`);
			throw new AppError(
				'Você precisa informar a antiga senha para ser alterado!',
			);
		}

		if (password && oldPassword) {
			const checkOldPassword = await this.hashProvider.compareHash(
				oldPassword,
				user.password,
			);

			if (!checkOldPassword) {
				log(`❌ Antiga senha incorreta - SENHA: ${oldPassword}`);
				throw new AppError('Senha antiga não está correta!');
			}

			user.password = await this.hashProvider.generateHash(password);
		}

		log(`🧑 Usuário atualizado - EMAIL: ${email}`);

		return this.usersRepository.save(user);
	}
}

export { UpdateService };
