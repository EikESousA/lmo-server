import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	activate: boolean;
}

interface IResponse {
	data: Store;
	message: string;
}

@injectable()
class ActivateService {
	constructor(
		@inject('StoresRepository')
		private storesRepository: IStoresRepository,
	) {}

	public async execute({ id, activate }: IRequest): Promise<IResponse> {
		const store = await this.storesRepository.findById({
			id,
			select: ['id', 'activate'],
		});

		if (!store) {
			log(`❌ Empresa não autenticada`);
			throw new AppError('Empresa não autenticada!');
		}

		store.activate = activate;

		this.storesRepository.save(store);

		log(`🏪 Empresa atualizada - EMAIL: ${store.email}`);

		return { data: store, message: 'Empresa atualizada com sucesso!' };
	}
}

export { ActivateService };
