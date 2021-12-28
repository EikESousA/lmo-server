import { UserToken } from '@entities/UserToken';

interface IUsersTokenRepository {
	generate(user_id: string, info: number): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken | undefined>;
}

export { IUsersTokenRepository };
