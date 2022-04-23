import { v4 as uuidV4 } from 'uuid';

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
	private repository: User[];

	constructor() {
		this.repository = [];
	}

	public listRepository(): User[] {
		return this.repository;
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = new User();

		const id = uuidV4();

		Object.assign(user, {
			id,
			name,
			email,
			password,
		});

		this.repository.push(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		const findIndex = this.repository.findIndex(
			findUser => findUser.id === user.id,
		);

		this.repository[findIndex] = user;

		return user;
	}

	public async token({
		email,
		password,
		select,
	}: ITokenDTO): Promise<User | undefined> {
		const user = this.repository.find(
			findUser => findUser.email === email && findUser.password === password,
		);

		const keysUser = Object.keys(user);

		if (user) {
			select.forEach(atribute => {
				if (!keysUser.includes(atribute)) {
					delete user[atribute];
				}
			});
		}

		return user;
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<User | undefined> {
		const user = this.repository.find(findUser => findUser.email === email);

		if (user) {
			const keysUser = Object.keys(user);

			select.forEach(atribute => {
				if (!keysUser.includes(atribute)) {
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
		const user = this.repository.find(findUser => findUser.id === id);

		const keysUser = Object.keys(user);

		if (user) {
			select.forEach(atribute => {
				if (!keysUser.includes(atribute)) {
					delete user[atribute];
				}
			});
		}

		return user;
	}

	public async findAllUsers({ id, select }: IFindAllUsersDTO): Promise<User[]> {
		const all_users = this.repository.filter(
			filterUser => filterUser.id !== id,
		);

		const keysUser = Object.keys(all_users);

		all_users.forEach(user => {
			select.forEach(atribute => {
				if (!keysUser.includes(atribute)) {
					// eslint-disable-next-line no-param-reassign
					delete user[atribute];
				}
			});
		});

		return all_users;
	}
}

export { FakeUsersRepository };
