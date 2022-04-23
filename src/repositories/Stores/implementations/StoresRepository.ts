import { Repository, getRepository } from 'typeorm';

import { Store } from '@entities/Store/Store';
import {
	ICreateStoreDTO,
	IFindAllStoresDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IStoresRepository,
} from '@repositories/Stores/interfaces/IStoresRepository';

class StoresRepository implements IStoresRepository {
	private repository: Repository<Store>;

	constructor() {
		this.repository = getRepository(Store);
	}

	public async create({
		addressId,
		name,
		email,
		cnpj,
		instagram,
		facebook,
		phone,
		avatar,
	}: ICreateStoreDTO): Promise<Store> {
		const store = this.repository.create({
			addressId,
			name,
			email,
			cnpj,
			instagram,
			facebook,
			phone,
			avatar,
		});
		await this.repository.save(store);
		return store;
	}

	public async save(store: Store): Promise<Store> {
		return this.repository.save(store);
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<Store | undefined> {
		const store = await this.repository.findOne({ where: { email }, select });

		return store;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Store | undefined> {
		const store = await this.repository.findOne({ where: { id }, select });

		return store;
	}

	public async findAllStores({ select }: IFindAllStoresDTO): Promise<Store[]> {
		const stores = await this.repository.find({
			select,
		});

		return stores;
	}
}

export { StoresRepository };
