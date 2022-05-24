import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/interfaces/IStorageProvider';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	fileName: string;
}

interface IResponse {
	data: string;
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

	public async execute({ id, fileName }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById({
			id,
			select: ['id', 'avatar'],
		});

		if (!user) {
			log(`❌ Usuário não autenticado`);
			throw new AppError('Usuário não autenticado!', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar, 'user');
		}

		const filename = await this.storageProvider.saveFile(fileName, 'user');

		user.avatar = filename;

		await this.usersRepository.save(user);

		user.avatarUrl = user.getAvatar_URL();

		delete user.avatar;

		log(`🧑 Usuário alterou avatar - EMAIL: ${user.email}`);

		return {
			data: user.avatarUrl,
			message: 'Avatar do usuário alterado com sucesso!',
		};
	}
}

export { AvatarService };
