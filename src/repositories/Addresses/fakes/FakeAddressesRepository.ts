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

	public async save(store: Address): Promise<Address> {
		const findIndex = this.repository.findIndex(
			findStore => findStore.id === store.id,
		);

		this.repository[findIndex] = store;

		return store;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<Address | undefined> {
		const address = this.repository.find(findAddress => findAddress.id === id);

		if (address) {
			this.repositoryKeys.forEach(atribute => {
				if (!select.includes(atribute)) {
					delete address[atribute];
				}
			});
		}

		return address;
	}
}

export { FakeAddressesRepository };
