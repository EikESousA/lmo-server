import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IStorageProvider } from '@providers/models/IStorageProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
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
			throw new AppError('Usuário não autenticado!', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		const filename = await this.storageProvider.saveFile(avatarFileName);

		user.avatar = filename;

		await this.usersRepository.save(user);

		return user;
	}
}

export { AvatarService };
