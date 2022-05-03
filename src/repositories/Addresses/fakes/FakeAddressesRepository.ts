import { v4 as uuidV4 } from 'uuid';

import { Address } from '@entities/Address/Address';
import {
	ICreateAddressDTO,
	IFindByIdDTO,
	IAddressesRepository,
} from '@repositories/Addresses/interfaces/IAddressesRepository';

class FakeAddressesRepository implements IAddressesRepository {
	private repository: Address[];

	private repositoryKeys: (keyof Address)[] = [
		'id',
		'street',
		'district',
		'number',
		'cep',
		'city',
		'state',
		'country',
		'url',
		'createdAt',
		'updatedAt',
	];

	constructor() {
		this.repository = [];
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
		const address = new Address();

		const id = uuidV4();

		Object.assign(address, {
			id,
			street,
			district,
			number,
			cep,
			city,
			state,
			country,
			url,
		});

		this.repository.push(address);

		return address;
	}

	public async save(address: Address): Promise<Address> {
		const findIndex = this.repository.findIndex(
			findStore => findStore.id === address.id,
		);

		if (findIndex >= 0) {
			if (address.street !== undefined) {
				this.repository[findIndex].street = address.street;
			}
			if (address.district !== undefined) {
				this.repository[findIndex].district = address.district;
			}
			if (address.number !== undefined) {
				this.repository[findIndex].number = address.number;
			}
			if (address.cep !== undefined) {
				this.repository[findIndex].cep = address.cep;
			}
			if (address.city !== undefined) {
				this.repository[findIndex].city = address.city;
			}
			if (address.state !== undefined) {
				this.repository[findIndex].state = address.state;
			}
			if (address.country !== undefined) {
				this.repository[findIndex].country = address.country;
			}
			if (address.url !== undefined) {
				this.repository[findIndex].url = address.url;
			}
		}

		return address;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Address | undefined> {
		const indexAddress = this.repository.findIndex(
			findAddress => findAddress.id === id,
		);

		if (indexAddress >= 0) {
			const address = new Address();

			Object.assign(address, this.repository[indexAddress]);

			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete address[atribute];
				}
			});

			return address;
		}

		return null;
	}
}

export { FakeAddressesRepository };
