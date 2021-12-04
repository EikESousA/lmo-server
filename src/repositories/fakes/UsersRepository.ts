import { User } from '@models/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ICreateSessionDTO,
} from '@repositories/models/IUsersRepository';

class UsersRepository implements IUsersRepository {
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

		Object.assign(user, {
			name,
			email,
			password,
		});

		this.users.push(user);

		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(user => user.email === email);

		return user;
	}

	public async createSession({
		email,
		password,
	}: ICreateSessionDTO): Promise<User | undefined> {
		const user = this.users.find(
			user => user.email === email && user.password === password,
		);

		return user;
	}
}

export { UsersRepository };
