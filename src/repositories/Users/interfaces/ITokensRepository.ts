import { Token } from '@entities/Token';

interface ITokensRepository {
	create(user_id: string, info: number): Promise<Token>;
	delete(session: Token): Promise<void>;
	findByToken(token: string): Promise<Token | undefined>;
}

export { ITokensRepository };
