import { Store } from '@entities/Store';
import {
	ICreateStoreDTO,
	IFindAllStoresDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IStoresRepository,
} from '@repositories/interfaces/IStoresRepository';

class StoresRepository implements IStoresRepository {
	private stores: Store[];

	constructor() {
		this.stores = [];
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
		const store = new Store();

		Object.assign(store, {
			name,
			cnpj,
			instagram,
			facebook,
			address,
			phone,
			avatar,
		});

		this.stores.push(store);

		return store;
	}

	public async save(store: Store): Promise<Store> {
		const findIndex = this.stores.findIndex(
			findStore => findStore.id === store.id,
		);

		this.stores[findIndex] = store;

		return store;
	}

	public async delete(store: Store): Promise<void> {
		const updatedStores = [...this.stores];

		const storeIndex = updatedStores.findIndex(
			storeFind => storeFind.id === store.id,
		);

		if (storeIndex >= 0) {
			updatedStores.splice(storeIndex, 1);
		}
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<Store | undefined> {
		const store = this.stores.find(findStore => findStore.email === email);

		select.forEach(atribute => {
			delete store[atribute];
		});

		return store;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Store | undefined> {
		const store = this.stores.find(findStore => findStore.id === id);

		select.forEach(atribute => {
			delete store[atribute];
		});

		return store;
	}

	public async findAllStores({ select }: IFindAllStoresDTO): Promise<Store[]> {
		const all_users = [...this.stores];

		all_users.forEach(user => {
			select.forEach(atribute => {
				// eslint-disable-next-line no-param-reassign
				delete user[atribute];
			});
		});

		return all_users;
	}
}

export { StoresRepository };
