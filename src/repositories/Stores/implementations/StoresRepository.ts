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
		name,
		email,
		phone,
		instagram,
		facebook,
		cnpj,
	}: ICreateStoreDTO): Promise<Store> {
		const store = this.repository.create({
			name,
			email,
			phone,
			instagram,
			facebook,
			cnpj,
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
		const store = await this.repository.findOne({
			where: { email },
			select: select || null,
		});

		return store;
	}

	public async findById({
		id,
		selectStore,
		selectAddress,
	}: IFindByIdDTO): Promise<Store | undefined> {
		const store = await this.repository.findOne({
			where: { id },
			select: select || null,
			relations: ['address'],
		});

		return store;
	}

	public async findAllStores({ select }: IFindAllStoresDTO): Promise<Store[]> {
		const stores = await this.repository.find({
			select: select || null,
		});

		return stores;
	}
}

export { StoresRepository };
