import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	addressId?: string;
	name: string;
	email: string;
	cnpj?: string;
	instagram?: string;
	facebook?: string;
	phone?: string;
}

interface IResponse {
	data: Store;
	message: string;
}

@injectable()
class CreateService {
	constructor(
		@inject('StoresRepository')
		private StoresRepository: IStoresRepository,
	) {}

	public async execute({
		addressId,
		name,
		email,
		cnpj,
		facebook,
		instagram,
		phone,
	}: IRequest): Promise<IResponse> {
		const storeAlreadyExists = await this.StoresRepository.findByEmail({
			email,
			select: ['id'],
		});

		if (storeAlreadyExists) {
			log(`❌ Empresa já existe - EMAIL: ${email}`);
			throw new AppError('Empresa já existe!', 400);
		}

		const store = await this.StoresRepository.create({
			name,
			email,
			cnpj,
			facebook,
			instagram,
			phone,
			addressId,
		});

		delete store.cnpj;
		delete store.instagram;
		delete store.facebook;
		delete store.addressId;
		delete store.phone;
		delete store.created_at;
		delete store.updated_at;

		log(`🏪 Empresa criada - EMAIL: ${email}`);

		return {
			data: store,
			message: 'Empresa criada com sucesso!',
		};
	}
}

export { CreateService };
