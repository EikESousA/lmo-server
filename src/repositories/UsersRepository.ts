import { User } from '../models/User';

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

class UsersRepository {
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

	list(): User[] {
		return this.users;
	}

	findByName(name: string): User {
		const user = this.users.find(user => user.name === name);

		return user;
	}
}

export { UsersRepository };
