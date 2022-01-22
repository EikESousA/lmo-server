import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	name?: string;
	email?: string;
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
class UpdateService {
	constructor(
		@inject('StoresRepository')
		private storesRepository: IStoresRepository,
	) {}

	public async execute({
		id,
		name,
		email,
		cnpj,
		facebook,
		instagram,
		phone,
		address,
	}: IRequest): Promise<IResponse> {
		const store = await this.storesRepository.findById({
			id,
		});

		if (!store) {
			log(`❌ Empresa não autenticada`);
			throw new AppError('Empresa não autenticada!');
		}

		if (name) {
			store.name = name;
		}

		if (email) {
			const userWithUpdatedEmail = await this.storesRepository.findByEmail({
				email,
			});

			if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
				log(`❌ E-mail utilizado`);
				throw new AppError('E-mail já está sendo utilizado!');
			}

			store.email = email;
		}

		if (cnpj) {
			store.cnpj = cnpj;
		}

		if (facebook) {
			store.facebook = facebook;
		}

		if (instagram) {
			store.instagram = instagram;
		}

		if (address) {
			store.address = address;
		}

		if (phone) {
			store.phone = phone;
		}

		this.storesRepository.save(store);

		store.avatar_url = store.getAvatar_URL();

		delete store.avatar;
		delete store.created_at;
		delete store.updated_at;

		log(`🏪 Empresa atualizada - EMAIL: ${email}`);

		return { data: store, message: 'Empresa atualizada com sucesso!' };
	}
}

export { UpdateService };
