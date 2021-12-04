import { User } from '@models/User';

interface ICreateSessionDTO {
	email: string;
	password: string;
}

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

interface IUsersRepository {
	create({ name, email, password }: ICreateUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | undefined>;
	createSession({
		email,
		password,
	}: ICreateSessionDTO): Promise<User | undefined>;
}

export { IUsersRepository, ICreateSessionDTO, ICreateUserDTO };
