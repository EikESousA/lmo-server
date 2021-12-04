import { User } from '@models/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ICreateSessionDTO,
} from '@repositories/models/IUsersRepository';

class PostgresUserRepository implements IUsersRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = new User();
		console.log({ name, email, password });
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = new User();
		console.log(email);
		return user;
	}

	public async createSession({
		email,
		password,
	}: ICreateSessionDTO): Promise<User | undefined> {
		const user = new User();
		console.log({ email, password });
		return user;
	}
}

export { PostgresUserRepository };
