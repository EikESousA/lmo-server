import { v4 as uuidV4 } from 'uuid';

import { Store } from '@entities/Store/Store';
import {
	ICreateStoreDTO,
	IFindAllStoresDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IStoresRepository,
} from '@repositories/Stores/interfaces/IStoresRepository';

class FakeStoresRepository implements IStoresRepository {
	private repository: Store[];

	private repositoryKeys: (keyof Store)[] = [
		'id',
		'addressId',
		'name',
		'email',
		'cnpj',
		'instagram',
		'facebook',
		'phone',
		'avatar',
		'url',
		'createdAt',
		'updatedAt',
	];

	constructor() {
		this.repository = [];
	}

	public async create({
		name,
		email,
		phone,
		instagram,
		facebook,
		cnpj,
	}: ICreateStoreDTO): Promise<Store> {
		const store = new Store();

		const id = uuidV4();

		Object.assign(store, {
			id,
			name,
			email,
			phone,
			instagram,
			facebook,
			cnpj,
		});

		this.repository.push(store);

		return store;
	}

	public async save(store: Store): Promise<Store> {
		const findIndex = this.repository.findIndex(
			findStore => findStore.id === store.id,
		);

		this.repository[findIndex] = store;

		return store;
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<Store | undefined> {
		const store = this.repository.find(findStore => findStore.email === email);

		if (store) {
			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete store[atribute];
				}
			});
		}

		return store;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Store | undefined> {
		const store = this.repository.find(findStore => findStore.id === id);

		if (store) {
			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete store[atribute];
				}
			});
		}

		return store;
	}

	public async findAllStores({ select }: IFindAllStoresDTO): Promise<Store[]> {
		const allStores = [...this.repository];

		allStores.forEach(store => {
			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					// eslint-disable-next-line no-param-reassign
					delete store[atribute];
				}
			});
		});

		return allStores;
	}
}

export { FakeStoresRepository };
