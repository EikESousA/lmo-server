import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/interfaces/IStorageProvider';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
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
		@inject('StoresRepository')
		private storesRepository: IStoresRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({ id, fileName }: IRequest): Promise<IResponse> {
		const store = await this.storesRepository.findById({
			id,
			select: ['id', 'avatar'],
		});

		if (!store) {
			log(`❌ Empresa não autenticada`);
			throw new AppError('Empresa não autenticada!', 401);
		}

		if (store.avatar) {
			await this.storageProvider.deleteFile(store.avatar, 'store');
		}

		const filename = await this.storageProvider.saveFile(fileName, 'store');

		store.avatar = filename;

		await this.storesRepository.save(store);

		store.avatarUrl = store.getAvatarURL();

		delete store.avatar;

		log(`🧑 Usuário alterou avatar - EMAIL: ${store.email}`);

		return {
			data: store.avatar,
			message: 'Avatar da empresa alterado com sucesso!',
		};
	}
}

export { AvatarService };
