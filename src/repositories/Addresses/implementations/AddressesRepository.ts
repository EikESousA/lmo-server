import { Repository, getRepository } from 'typeorm';

import { Address } from '@entities/Address/Address';
import {
	IAddressesRepository,
	ICreateAddressDTO,
	IFindByIdDTO,
} from '@repositories/Addresses/interfaces/IAddressesRepository';

class AddressesRepository implements IAddressesRepository {
	private repository: Repository<Address>;

	constructor() {
		this.repository = getRepository(Address);
	}

	public async create({
		street,
		district,
		number,
		cep,
		city,
		state,
		country,
		url,
	}: ICreateAddressDTO): Promise<Address> {
		const address = this.repository.create({
			street,
			district,
			number,
			cep,
			city,
			state,
			country,
			url,
		});

		await this.repository.save(address);

		return address;
	}

	public async save(store: Address): Promise<Address> {
		return this.repository.save(store);
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Address | undefined> {
		const address = await this.repository.findOne({ where: { id }, select });

		return address;
	}
}

export { AddressesRepository };
