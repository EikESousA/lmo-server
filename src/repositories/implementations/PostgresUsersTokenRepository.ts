import { UserToken } from '@entities/UserToken';
import { IUsersTokenRepository } from '@repositories/models/IUsersTokenRepository';
import { getRepository, Repository } from 'typeorm';

class PostgresUsersTokenRepository implements IUsersTokenRepository {
	private ormRepository: Repository<UserToken>;

	constructor() {
		this.ormRepository = getRepository(UserToken);
	}

	public async generate(user_id: string, info: number): Promise<UserToken> {
		const userToken = this.ormRepository.create({ user_id, info });
		await this.ormRepository.save(userToken);
		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.ormRepository.findOne({ where: { token } });
		return userToken;
	}
}

export { PostgresUsersTokenRepository };
