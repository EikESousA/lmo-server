import { v4 as uuidV4 } from 'uuid';

import { Token } from '@entities/User/Token';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';

class FakeTokensRepository implements ITokensRepository {
	private repository: Token[];

	constructor() {
		this.repository = [];
	}

	public listRepository(): Token[] {
		return this.repository;
	}

	public async create(user_id: string, info: number): Promise<Token> {
		const token = new Token();

		const id = uuidV4();

		Object.assign(token, {
			id,
			user_id,
			info,
		});

		this.repository.push(token);

		return token;
	}

	public async findByToken(token: string): Promise<Token | undefined> {
		const tokenFind = this.repository.find(item => item.token === token);

		return tokenFind;
	}

	public async delete(session: Token): Promise<void> {
		const updatedTokens = [...this.repository];

		const tokenIndex = updatedTokens.findIndex(
			sessionFind => sessionFind.id === session.id,
		);

		if (tokenIndex >= 0) {
			updatedTokens.splice(tokenIndex, 1);
		}
	}
}

export { FakeTokensRepository };
