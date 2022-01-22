import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	name: string;
	email: string;
	cnpj?: string;
	instagram?: string;
	facebook?: string;
	address?: string;
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
		private storesRepository: IStoresRepository,
	) {}

	public async execute({
		name,
		email,
		cnpj,
		facebook,
		instagram,
		phone,
		address,
	}: IRequest): Promise<IResponse> {
		const storeAlreadyExists = await this.storesRepository.findByEmail({
			email,
			select: ['id'],
		});

		if (storeAlreadyExists) {
			log(`❌ Empresa já existe - EMAIL: ${email}`);
			throw new AppError('Empresa já existe!', 400);
		}

		const store = await this.storesRepository.create({
			name,
			email,
			cnpj,
			facebook,
			instagram,
			phone,
			address,
		});

		delete store.user_id;
		delete store.cnpj;
		delete store.instagram;
		delete store.facebook;
		delete store.address;
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
