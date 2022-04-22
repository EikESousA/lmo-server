import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	name?: string;
	email?: string;
	phone?: string;
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
		id,
		name,
		email,
		phone,
		password,
		oldPassword,
	}: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById({
			id,
			select: [
				'id',
				'name',
				'email',
				'phone',
				'avatar',
				'level',
				'activate',
				'password',
			],
		});

		if (!user) {
			log(`❌ Usuário não autenticado`);
			throw new AppError('Usuário não autenticado!');
		}

		if (name) {
			user.name = name;
		}

		if (email) {
			const userWithUpdatedEmail = await this.usersRepository.findByEmail({
				email,
			});

			if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
				log(`❌ E-mail utilizado`);
				throw new AppError('E-mail já está sendo utilizado!');
			}
			user.email = email;
		}

		if (password && !oldPassword) {
			log(`❌ Antiga senha vazia`);
			throw new AppError(
				'Você precisa informar a antiga senha para ser alterado!',
			);
		}

		if (phone) {
			user.phone = phone;
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

		log(`🧑 Usuário atualizado - EMAIL: ${email}`);

		return { data: user, message: 'Usuário atualizado com sucesso!' };
	}
}

export { UpdateService };
