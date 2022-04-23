import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
}

interface IResponse {
	data: Store;
	message: string;
}

@injectable()
class ShowService {
	constructor(
		@inject('StoresRepository')
		private StoresRepository: IStoresRepository,
	) {}

	public async execute({ id }: IRequest): Promise<IResponse> {
		const store = await this.StoresRepository.findById({
			id,
			select: ['id', 'name', 'email', 'avatar', 'activate'],
		});

		if (!store) {
			log(`❌ Empresa não existe`);
			throw new AppError('Empresa não encontrado!');
		}

		store.avatar_url = store.getAvatar_URL();

		delete store.avatar;

		log(`🏪 Empresa encontrado - NOME: ${store.name}`);

		return { data: store, message: 'Empresa encontrada com sucesso!' };
	}
}

export { ShowService };
