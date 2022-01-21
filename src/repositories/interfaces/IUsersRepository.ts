import { User } from '@entities/User';

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}
interface ISessionDTO {
	email: string;
	password: string;
	select?: (keyof User)[];
}

interface IFindByEmailDTO {
	email: string;
	select?: (keyof User)[];
}

interface IFindByIdDTO {
	id: string;
	select?: (keyof User)[];
}

interface IFindAllProvidersDTO {
	id: string;
	select?: (keyof User)[];
}

interface IUsersRepository {
	create({ name, email, password }: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
	session({ email, password, select }: ISessionDTO): Promise<User | undefined>;
	findByEmail({ email, select }: IFindByEmailDTO): Promise<User | undefined>;
	findById({ id, select }: IFindByIdDTO): Promise<User | undefined>;
	findAllProviders({ id, select }: IFindAllProvidersDTO): Promise<User[]>;
}

export {
	IUsersRepository,
	ICreateUserDTO,
	ISessionDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllProvidersDTO,
};
