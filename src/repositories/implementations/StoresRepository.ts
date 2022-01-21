import { Repository, getRepository } from 'typeorm';

import { Store } from '@entities/Store';
import {
	ICreateStoreDTO,
	IStoresRepository,
} from '@repositories/interfaces/IStoresRepository';

class StoresRepository implements IStoresRepository {
	private repository: Repository<Store>;

	constructor() {
		this.repository = getRepository(Store);
	}

	public async create({
		name,
		cnpj,
		instagram,
		facebook,
		address,
		phone,
		avatar,
	}: ICreateStoreDTO): Promise<Store> {
		const store = this.repository.create({
			name,
			cnpj,
			instagram,
			facebook,
			address,
			phone,
			avatar,
		});
		await this.repository.save(store);
		return store;
	}

	public async delete(store: Store): Promise<void> {
		await this.repository.remove(store);
	}

	public async save(store: Store): Promise<Store> {
		return this.repository.save(store);
	}
}

export { StoresRepository };
