import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/interfaces/IStorageProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	userId: string;
	avatarFileName: string;
}

interface IResponse {
	data: User;
	message: string;
}

@injectable()
class AvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({
		userId,
		avatarFileName,
	}: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			log(`❌ Usuário não autenticado`);
			throw new AppError('Usuário não autenticado!', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar, 'avatar');
		}

		const filename = await this.storageProvider.saveFile(
			avatarFileName,
			'avatar',
		);

		user.avatar = filename;

		await this.usersRepository.save(user);

		user.avatar_url = user.getAvatar_URL();

		delete user.password;
		delete user.avatar;
		delete user.activate;
		delete user.created_at;
		delete user.updated_at;

		log(`🧑 Usuário alterou avatar - EMAIL: ${user.email}`);

		return { data: user, message: 'Avatar do usuário alterao com sucesso!' };
	}
}

export { AvatarService };
