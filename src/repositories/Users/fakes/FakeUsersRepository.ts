import { User } from '@entities/User/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ITokenDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllUsersDTO,
} from '@repositories/Users/interfaces/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
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

	public async token({
		email,
		password,
		select,
	}: ITokenDTO): Promise<User | undefined> {
		const user = this.users.find(
			findUser => findUser.email === email && findUser.password === password,
		);

		select.forEach(atribute => {
			delete user[atribute];
		});

		return user;
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<User | undefined> {
		const user = this.users.find(findUser => findUser.email === email);

		if (user) {
			select.forEach(atribute => {
				if (user[atribute]) {
					delete user[atribute];
				}
			});
		}

		return user;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<User | undefined> {
		const user = this.users.find(findUser => findUser.id === id);

		if (user) {
			select.forEach(atribute => {
				if (user[atribute]) {
					delete user[atribute];
				}
			});
		}

		return user;
	}

	public async findAllUsers({ id, select }: IFindAllUsersDTO): Promise<User[]> {
		const all_users = this.users.filter(filterUser => filterUser.id !== id);

		all_users.forEach(user => {
			select.forEach(atribute => {
				// eslint-disable-next-line no-param-reassign
				delete user[atribute];
			});
		});

		return all_users;
	}
}

export { FakeUsersRepository };
