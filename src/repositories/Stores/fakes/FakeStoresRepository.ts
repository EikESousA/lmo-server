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
			activate: true,
		});

		this.repository.push(store);

		return store;
	}

	public async save(store: Store): Promise<Store> {
		const findIndex = this.repository.findIndex(
			findStore => findStore.id === store.id,
		);

		if (findIndex >= 0) {
			if (store.addressId !== undefined) {
				this.repository[findIndex].addressId = store.addressId;
			}
			if (store.name !== undefined) {
				this.repository[findIndex].name = store.name;
			}
			if (store.email !== undefined) {
				this.repository[findIndex].email = store.email;
			}
			if (store.phone !== undefined) {
				this.repository[findIndex].phone = store.phone;
			}
			if (store.instagram !== undefined) {
				this.repository[findIndex].instagram = store.instagram;
			}
			if (store.facebook !== undefined) {
				this.repository[findIndex].facebook = store.facebook;
			}
			if (store.cnpj !== undefined) {
				this.repository[findIndex].cnpj = store.cnpj;
			}
			if (store.avatar !== undefined) {
				this.repository[findIndex].avatar = store.avatar;
			}
			if (store.activate !== undefined) {
				this.repository[findIndex].activate = store.activate;
			}
		}

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
		const indexStore = this.repository.findIndex(
			findStore => findStore.id === id,
		);

		if (indexStore >= 0) {
			const store = new Store();

			Object.assign(store, this.repository[indexStore]);

			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete store[atribute];
				}
			});

			return store;
		}

		return null;
	}

	public async findAllStores({ select }: IFindAllStoresDTO): Promise<Store[]> {
		const allStores = [];

		this.repository.forEach((store, index) => {
			const newStore = new Store();

			Object.assign(newStore, this.repository[index]);

			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete newStore[atribute];
				}
			});

			allStores.push(newStore);
		});

		return allStores;
	}
}

export { FakeStoresRepository };
