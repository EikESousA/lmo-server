import { Address } from '@entities/Address/Address';

interface ICreateAddressDTO {
	street: string;
	district: string;
	number: string;
	cep: string;
	city: string;
	state: string;
	country: string;
	url?: string;
}

interface IFindByIdDTO {
	id: string;
	select?: (keyof Address)[];
}

interface IAddressesRepository {
	create({
		street,
		district,
		number,
		cep,
		city,
		state,
		country,
		url,
	}: ICreateAddressDTO): Promise<Address>;
	save(address: Address): Promise<Address>;
	findById({ id, select }: IFindByIdDTO): Promise<Address | undefined>;
}

export { IAddressesRepository, ICreateAddressDTO, IFindByIdDTO };
