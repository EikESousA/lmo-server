import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { AppError } from '@errors/AppError';
import { IAddressesRepository } from '@repositories/Addresses/interfaces/IAddressesRepository';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	storeId: string;
	addressId?: string;
	street?: string;
	district?: string;
	number?: string;
	cep?: string;
	city?: string;
	state?: string;
	country?: string;
	url?: string;
}

interface IResponse {
	data: Store;
	message: string;
}

@injectable()
class AddressService {
	constructor(
		@inject('StoresRepository')
		private storesRepository: IStoresRepository,
		@inject('AddressesRepository')
		private addressesRepository: IAddressesRepository,
	) {}

	public async execute({
		storeId,
		addressId,
		street,
		district,
		number,
		cep,
		city,
		state,
		country,
		url,
	}: IRequest): Promise<IResponse> {
		const store = await this.storesRepository.findById({
			id: storeId,
			select: ['id', 'email'],
		});

		if (!store) {
			log(`❌ Empresa não autenticada`);
			throw new AppError('Empresa não autenticada!');
		}

		if (!addressId) {
			const address = await this.addressesRepository.create({
				street,
				district,
				number,
				cep,
				city,
				state,
				country,
				url,
			});

			delete address.createdAt;
			delete address.updatedAt;

			store.addressId = address.id;

			this.storesRepository.save(store);

			store.address = address;

			log(`🏪 Endereço da empresa criado - EMAIL: ${store.email}`);

			return {
				data: store,
				message: 'Endereço da empresa criado com sucesso!',
			};
		}

		const address = await this.addressesRepository.findById({
			id: addressId,
			select: ['id'],
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

		store.address = address;

		return { data: store, message: 'Empresa atualizada com sucesso!' };
	}
}

export { AddressService };
