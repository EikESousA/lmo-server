import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { Store } from '@entities/Store/Store';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
	addressId?: string;
	name?: string;
	email?: string;
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
class UpdateService {
	constructor(
		@inject('StoreRepository')
		private StoresRepository: IStoresRepository,
	) {}

	public async execute({
		addressId,
		id,
		name,
		email,
		cnpj,
		facebook,
		instagram,
		phone,
	}: IRequest): Promise<IResponse> {
		const store = await this.StoresRepository.findById({
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
			const userWithUpdatedEmail = await this.StoresRepository.findByEmail({
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

		if (addressId) {
			store.addressId = addressId;
		}

		if (phone) {
			store.phone = phone;
		}

		this.StoresRepository.save(store);

		store.avatar_url = store.getAvatar_URL();

		delete store.avatar;
		delete store.createdAt;
		delete store.updatedAt;

		log(`🏪 Empresa atualizada - EMAIL: ${email}`);

		return { data: store, message: 'Empresa atualizada com sucesso!' };
	}
}

export { UpdateService };
