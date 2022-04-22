import { Repository, getRepository, Not } from 'typeorm';

import { User } from '@entities/User/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ITokenDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllUsersDTO,
} from '@repositories/Users/interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = getRepository(User);
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = this.repository.create({
			name,
			email,
			password,
		});

		await this.repository.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		return this.repository.save(user);
	}

	public async token({
		email,
		password,
		select,
	}: ITokenDTO): Promise<User | undefined> {
		const user = await this.repository.findOne({
			select,
			where: { email, password },
		});

		return user;
	}

	public async findByEmail({
		email,
		select,
	}: IFindByEmailDTO): Promise<User | undefined> {
		const user = await this.repository.findOne({ where: { email }, select });

		return user;
	}

	public async findById({
		id,
		select,
	}: IFindByIdDTO): Promise<User | undefined> {
		const user = await this.repository.findOne({ where: { id }, select });

		return user;
	}

	public async findAllUsers({ id, select }: IFindAllUsersDTO): Promise<User[]> {
		const users = await this.repository.find({
			where: {
				id: Not(id),
			},
			select,
		});

		return users;
	}
}

export { UsersRepository };
