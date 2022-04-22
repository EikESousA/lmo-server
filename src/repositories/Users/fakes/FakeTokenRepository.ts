import { Token } from '@entities/User/Token';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';

class FakeTokensRepository implements ITokensRepository {
	private tokens: Token[];

	constructor() {
		this.tokens = [];
	}

	public listRepository(): Token[] {
		return this.tokens;
	}

	public async create(user_id: string, info: number): Promise<Token> {
		const token = new Token();

		Object.assign(token, {
			user_id,
			info,
		});

		this.tokens.push(token);

		return token;
	}

	public async findByToken(token: string): Promise<Token | undefined> {
		const tokenFind = this.tokens.find(item => item.token === token);

		return tokenFind;
	}

	public async delete(session: Token): Promise<void> {
		const updatedTokens = [...this.tokens];

		const tokenIndex = updatedTokens.findIndex(
			sessionFind => sessionFind.id === session.id,
		);

		if (tokenIndex >= 0) {
			updatedTokens.splice(tokenIndex, 1);
		}
	}
}

export { FakeTokensRepository };
