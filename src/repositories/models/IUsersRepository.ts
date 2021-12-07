import { User } from '@models/User';

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}
interface ISessionDTO {
	email: string;
	password: string;
}
interface IFindAllProvidersDTO {
	except_user_id?: string;
}

interface IUsersRepository {
	create({ name, email, password }: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
	session({ email, password }: ISessionDTO): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User | undefined>;
	findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}

export { IUsersRepository, ICreateUserDTO, ISessionDTO, IFindAllProvidersDTO };
