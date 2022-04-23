import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Address } from '@entities/Address/Address';
import { IAddressesRepository } from '@repositories/Addresses/interfaces/IAddressesRepository';
import { log } from '@utils/log';

interface IRequest {
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
class CreateService {
	constructor(
		@inject('AddressesRepository')
		private AddressesRepository: IAddressesRepository,
	) {}

	public async execute({
		street,
		district,
		number,
		cep,
		city,
		state,
		country,
		url,
	}: IRequest): Promise<IResponse> {
		const address = await this.AddressesRepository.create({
			street,
			district,
			number,
			cep,
			city,
			state,
			country,
			url,
		});

		delete address.created_at;
		delete address.updated_at;

		log(`🏪 Endereço criado - CEP: ${cep}`);

		return {
			data: address,
			message: 'Endereço criado com sucesso!',
		};
	}
}

export { CreateService };
