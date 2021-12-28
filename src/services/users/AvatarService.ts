import 'reflect-metadata';

import { User } from '@entities/User';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/interfaces/IStorageProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { log } from '@utils/log';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	userId: string;
	avatarFileName: string;
}

@injectable()
class AvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
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

		log(`🧑 Usuário alterou avatar - EMAIL: ${user.email}`);

		return user;
	}
}

export { AvatarService };
