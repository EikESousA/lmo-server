import { User } from '@entities/User/User';

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

interface ITokenDTO {
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

interface IFindAllUsersDTO {
	id: string;
	select?: (keyof User)[];
}

interface IUsersRepository {
	create({ name, email, password }: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
	token({ email, password, select }: ITokenDTO): Promise<User | undefined>;
	findByEmail({ email, select }: IFindByEmailDTO): Promise<User | undefined>;
	findById({ id, select }: IFindByIdDTO): Promise<User | undefined>;
	findAllUsers({ id, select }: IFindAllUsersDTO): Promise<User[]>;
}

export {
	IUsersRepository,
	ICreateUserDTO,
	ITokenDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllUsersDTO,
};
