import { Store } from '@entities/Store';

interface ICreateStoreDTO {
	name: string;
	email: string;
	cnpj?: string;
	instagram?: string;
	facebook?: string;
	address?: string;
	phone?: string;
	avatar?: string;
}

interface IFindByEmailDTO {
	email: string;
	select?: (keyof Store)[];
}

interface IFindByIdDTO {
	id: string;
	select?: (keyof Store)[];
}

interface IFindByUserIdDTO {
	id: string;
	select?: (keyof Store)[];
}

interface IFindAllStoresDTO {
	select?: (keyof Store)[];
}

interface IStoresRepository {
	create({
		name,
		email,
		cnpj,
		instagram,
		facebook,
		address,
		phone,
		avatar,
	}: ICreateStoreDTO): Promise<Store>;
	save(store: Store): Promise<Store>;
	delete(store: Store): Promise<void>;
	findByEmail({ email, select }: IFindByEmailDTO): Promise<Store | undefined>;
	findById({ id, select }: IFindByIdDTO): Promise<Store | undefined>;
	findByUserId({ id, select }: IFindByUserIdDTO): Promise<Store | undefined>;
	findAllStores({ select }: IFindAllStoresDTO): Promise<Store[] | undefined>;
}

export {
	IStoresRepository,
	ICreateStoreDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindByUserIdDTO,
	IFindAllStoresDTO,
};
