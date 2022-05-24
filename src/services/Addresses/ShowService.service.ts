import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Address } from '@entities/Address/Address';
import { AppError } from '@errors/AppError';
import { IAddressesRepository } from '@repositories/Addresses/interfaces/IAddressesRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
}

interface IResponse {
	data: Address;
	message: string;
}

@injectable()
class ShowService {
	constructor(
		@inject('AddressesRepository')
		private addressesRepository: IAddressesRepository,
	) {}

	public async execute({ id }: IRequest): Promise<IResponse> {
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
			log(`❌ Endereço não existe!`);
			throw new AppError('Endereço não encontrado!');
		}

		log(`🏪 Endereço encontrado - CEP: ${address.cep}`);

		return { data: address, message: 'Endereço encontrada com sucesso!' };
	}
}

export { ShowService };
