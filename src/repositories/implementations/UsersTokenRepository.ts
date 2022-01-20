import { getRepository, Repository } from 'typeorm';

import { UserToken } from '@entities/UserToken';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';

class UsersTokenRepository implements IUsersTokenRepository {
	private repository: Repository<UserToken>;

	constructor() {
		this.repository = getRepository(UserToken);
	}

	public async generate(user_id: string, info: number): Promise<UserToken> {
		const userToken = this.repository.create({ user_id, info });
		await this.repository.save(userToken);
		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.repository.findOne({ where: { token } });
		return userToken;
	}

	public async deleteUserToken(userToken: UserToken): Promise<void> {
		await this.repository.remove(userToken);
	}
}

export { UsersTokenRepository };
