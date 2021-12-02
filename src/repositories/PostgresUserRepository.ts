import { User } from '../models/User';
import {
	IUserRepository,
	ICreateUserDTO,
	ICreateSessionDTO,
} from './IUserRepository';

class PostgresUserRepository implements IUserRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}

	create({ name, email, password }: ICreateUserDTO): User {
		console.log({ name, email, password });
		return null;
	}

	findByEmail(email: string): User {
		console.log(email);
		return null;
	}

	createSession({ email, password }: ICreateSessionDTO): User {
		console.log({ email, password });
		return null;
	}
}

export { PostgresUserRepository };
