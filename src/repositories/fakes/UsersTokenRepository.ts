import { UserToken } from '@models/UserToken';
import { IUsersTokenRepository } from '@repositories/models/IUsersTokenRepository';

class UsersTokenRepository implements IUsersTokenRepository {
	private usersToken: UserToken[];

	constructor() {
		this.usersToken = [];
	}

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(userToken, {
			user_id,
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

export { UsersTokenRepository };
