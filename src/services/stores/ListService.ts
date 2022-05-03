import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IResponse {
	data: Store[];
	message: string;
}

@injectable()
class ListService {
	constructor(
		@inject('StoresRepository')
		private storesRepository: IStoresRepository,
	) {}

	public async execute(): Promise<IResponse> {
		const users = await this.storesRepository.findAllStores({
			select: ['id', 'name', 'email', 'activate'],
		});

		log(`🏪 Listando todas empresas`);

		return { data: users, message: 'Empresas listadas com sucesso!' };
	}
}

export { ListService };
