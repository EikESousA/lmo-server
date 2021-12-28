import { User } from '@entities/User';
import {
	IUsersRepository,
	ICreateUserDTO,
	ISessionDTO,
	IFindAllProvidersDTO,
} from '@repositories/interfaces/IUsersRepository';
import { Repository, getRepository, Not } from 'typeorm';

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
	}: ISessionDTO): Promise<User | undefined> {
		const user = await this.repository.findOne({
			where: { email, password },
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.repository.findOne({ where: { email } });
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.repository.findOne(id);
		return user;
	}

	public async findAllProviders({
		except_user_id,
	}: IFindAllProvidersDTO): Promise<User[]> {
		let users: User[];

		if (except_user_id) {
			users = await this.repository.find({
				where: {
					id: Not(except_user_id),
				},
			});
		} else {
			users = await this.repository.find();
		}

		return users;
	}
}

export { UsersRepository };
