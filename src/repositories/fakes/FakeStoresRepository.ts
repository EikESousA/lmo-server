import { Store } from '@entities/Store';
import {
	ICreateStoreDTO,
	IStoresRepository,
} from '@repositories/interfaces/IStoresRepository';

class FakeStoresRepository implements IStoresRepository {
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
		const updateStore = [...this.stores];

		const storeIndex = updateStore.findIndex(
			findStore => findStore.id === store.id,
		);

		if (storeIndex >= 0) {
			updateStore.splice(storeIndex, 1);
		}
	}
}

export { FakeStoresRepository };
