import { User } from '@models/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ISessionDTO,
	IFindAllProvidersDTO,
} from '@repositories/models/IUsersRepository';

class PostgresUsersRepository implements IUsersRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}

	public listRepository(): User[] {
		return this.users;
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

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
		this.users[findIndex] = user;
		return user;
	}

	public async session({
		email,
		password,
	}: ISessionDTO): Promise<User | undefined> {
		const user = this.users.find(
			findUser => findUser.email === email && findUser.password === password,
		);

		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(findUser => findUser.email === email);

		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find(findUser => findUser.id === id);
		return user;
	}

	public async findAllProviders({
		except_user_id,
	}: IFindAllProvidersDTO): Promise<User[]> {
		let all_users = this.users;
		if (except_user_id) {
			all_users = this.users.filter(
				filterUser => filterUser.id !== except_user_id,
			);
		}
		return all_users;
	}
}

export { PostgresUsersRepository };
