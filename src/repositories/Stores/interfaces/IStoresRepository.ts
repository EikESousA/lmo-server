import { Address } from '@entities/Address/Address';
import { Store } from '@entities/Store/Store';

interface ICreateStoreDTO {
	name: string;
	email: string;
	cnpj?: string;
	instagram?: string;
	facebook?: string;
	phone?: string;
	avatar?: string;
}

interface IFindByEmailDTO {
	email: string;
	selectStore?: (keyof Store)[];
	selectAddress?: (keyof Store)[];
}

interface IFindByIdDTO {
	id: string;
	selectStore?: (keyof Store)[];
	selectAddress?: (keyof Store)[];
}

interface IFindAllStoresDTO {
	selectStore?: (keyof Store)[];
	selectAddress?: (keyof Address)[];
}

interface IStoresRepository {
	create({
		name,
		email,
		phone,
		instagram,
		facebook,
		cnpj,
	}: ICreateStoreDTO): Promise<Store>;
	save(store: Store): Promise<Store>;
	findByEmail({ email, select }: IFindByEmailDTO): Promise<Store | undefined>;
	findById({ id, select }: IFindByIdDTO): Promise<Store | undefined>;
	findAllStores({ select }: IFindAllStoresDTO): Promise<Store[] | undefined>;
}

export {
	IStoresRepository,
	ICreateStoreDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllStoresDTO,
};
