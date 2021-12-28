import { UserToken } from '@entities/UserToken';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';

class FakeUsersTokenRepository implements IUsersTokenRepository {
	private usersToken: UserToken[];

	constructor() {
		this.usersToken = [];
	}

	public listRepository(): UserToken[] {
		return this.usersToken;
	}

	public async generate(user_id: string, info: number): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(userToken, {
			user_id,
			info,
		});

		this.usersToken.push(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = this.usersToken.find(
			userToken => userToken.token === token,
		);

		return userToken;
	}
}

export { FakeUsersTokenRepository };
