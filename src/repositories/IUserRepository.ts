import { User } from '../models/User';

interface ICreateSessionDTO {
	email: string;
	password: string;
}

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

interface IUserRepository {
	create({ name, email, password }: ICreateUserDTO): User;
	findByEmail(email: string): User;
	createSession({ email, password }: ICreateSessionDTO): User;
}

export { IUserRepository, ICreateSessionDTO, ICreateUserDTO };
