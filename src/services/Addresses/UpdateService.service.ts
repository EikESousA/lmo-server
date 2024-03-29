import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Address } from '@entities/Address/Address';
import { AppError } from '@errors/AppError';
import { IAddressesRepository } from '@repositories/Addresses/interfaces/IAddressesRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	street: string;
	district: string;
	number: string;
	cep: string;
	city: string;
	state: string;
	country: string;
	url?: string;
}

interface IResponse {
	data: Address;
	message: string;
}

@injectable()
class UpdateService {
	constructor(
		@inject('AddressesRepository')
		private addressesRepository: IAddressesRepository,
	) {}

	public async execute({
		id,
		street,
		district,
		number,
		cep,
		city,
		state,
		country,
		url,
	}: IRequest): Promise<IResponse> {
		const address = await this.addressesRepository.findById({
			id,
			select: [
				'id',
				'street',
				'district',
				'number',
				'cep',
				'city',
				'state',
				'country',
				'url',
			],
		});

		if (!address) {
			log(`❌ Endereço não encontrado!`);
			throw new AppError('Endereço não encontrado!');
		}

		if (street) {
			address.street = street;
		}

		if (district) {
			address.district = district;
		}

		if (number) {
			address.number = number;
		}

		if (cep) {
			address.cep = cep;
		}

		if (city) {
			address.city = city;
		}

		if (state) {
			address.state = state;
		}

		if (country) {
			address.country = country;
		}

		if (url) {
			address.url = url;
		}

		this.addressesRepository.save(address);

		delete address.createdAt;
		delete address.updatedAt;

		log(`🏪 Endereço atualizado - CEP: ${cep}`);

		return { data: address, message: 'Empresa atualizada com sucesso!' };
	}
}

export { UpdateService };
