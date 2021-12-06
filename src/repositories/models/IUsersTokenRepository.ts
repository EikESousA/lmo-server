import { UserToken } from '@models/UserToken';

interface IUsersTokenRepository {
	generate(user_id: string): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken | undefined>;
}

export { IUsersTokenRepository };
