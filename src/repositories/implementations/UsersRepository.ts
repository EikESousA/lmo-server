import { Repository, getRepository, Not } from 'typeorm';

import { User } from '@entities/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ISessionDTO,
	IFindByEmailDTO,
	IFindByIdDTO,
	IFindAllProvidersDTO,
} from '@repositories/interfaces/IUsersRepository';

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

	public async session({
		email,
		password,
		select,
	}: ISessionDTO): Promise<User | undefined> {
		const user = await this.repository.findOne({
			where: { email, password },
			select,
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

	public async findAllProviders({
		id,
		select,
	}: IFindAllProvidersDTO): Promise<User[]> {
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
