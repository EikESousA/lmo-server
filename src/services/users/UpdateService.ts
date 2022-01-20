import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	userId: string;
	name: string;
	email: string;
	password?: string;
	oldPassword?: string;
}

interface IResponse {
	data: User;
	message: string;
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
	}: IRequest): Promise<IResponse> {
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

		this.usersRepository.save(user);

		user.avatar_url = user.getAvatar_URL();

		delete user.password;
		delete user.avatar;
		delete user.activate;
		delete user.created_at;
		delete user.updated_at;

		log(`🧑 Usuário atualizado - EMAIL: ${email}`);

		return { data: user, message: 'Usuário atualizado com sucesso!' };
	}
}

export { UpdateService };
