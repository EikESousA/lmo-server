import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IStorageProvider } from '@providers/models/IStorageProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
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

		if (process.env.STORAGE_DRIVER === 'disk') {
			user.avatar_url = `${process.env.APP_API_URL}/avatar/${filename}`;
		} else {
			user.avatar_url = `${process.env.AWS_BUCKET_URL}/avatar/${filename}`;
		}

		await this.usersRepository.save(user);

		log(`🧑 Usuário alterou avatar - EMAIL: ${user.email}`);

		return user;
	}
}

export { AvatarService };
