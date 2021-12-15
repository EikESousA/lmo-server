import { UserToken } from '@models/UserToken';

interface IUsersTokenRepository {
	listRepository(): UserToken[];
	generate(user_id: string, info: number): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken | undefined>;
}

export { IUsersTokenRepository };
