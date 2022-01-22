import { Repository, getRepository } from 'typeorm';

import { Store } from '@entities/Store';
import {
	ICreateStoreDTO,
	IFindAllStoresDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindByUserIdDTO,
	IStoresRepository,
} from '@repositories/interfaces/IStoresRepository';

class StoresRepository implements IStoresRepository {
	private repository: Repository<Store>;

	constructor() {
		this.repository = getRepository(Store);
	}

	public async create({
		name,
		email,
		cnpj,
		instagram,
		facebook,
		address,
		phone,
		avatar,
	}: ICreateStoreDTO): Promise<Store> {
		const store = this.repository.create({
			name,
			email,
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

	public async save(store: Store): Promise<Store> {
		return this.repository.save(store);
	}

	public async delete(store: Store): Promise<void> {
		await this.repository.remove(store);
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

	public async findByUserId({
		id,
		select,
	}: IFindByUserIdDTO): Promise<Store | undefined> {
		const store = await this.repository.findOne({
			where: { user_id: id },
			select,
		});

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