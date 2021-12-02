import { User } from '../models/User';
import {
	IUserRepository,
	ICreateUserDTO,
	ICreateSessionDTO,
} from './IUserRepository';

class UsersRepository implements IUserRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}

	create({ name, email, password }: ICreateUserDTO): User {
		const user = new User();

		Object.assign(user, {
			name,
			email,
			password,
		});

		this.users.push(user);

		return user;
	}

	findByEmail(email: string): User {
		const user = this.users.find(user => user.email === email);

		return user;
	}

	createSession({ email, password }: ICreateSessionDTO): User {
		const user = this.users.find(
			user => user.email === email && user.password === password,
		);

		return user;
	}
}

export { UsersRepository };
