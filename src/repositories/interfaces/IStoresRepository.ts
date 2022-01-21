import { Store } from '@entities/Store';

interface ICreateStoreDTO {
	name: string;
	cnpj?: string;
	instagram?: string;
	facebook?: string;
	address?: string;
	phone?: string;
	avatar?: string;
}

interface IStoresRepository {
	create({
		name,
		cnpj,
		instagram,
		facebook,
		address,
		phone,
		avatar,
	}: ICreateStoreDTO): Promise<Store>;
	delete(store: Store): Promise<void>;
	save(store: Store): Promise<Store>;
}

export { IStoresRepository, ICreateStoreDTO };
