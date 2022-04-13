import { getRepository, Repository } from 'typeorm';

import { Token } from '@entities/Token';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';

class TokensRepository implements ITokensRepository {
	private repository: Repository<Token>;

	constructor() {
		this.repository = getRepository(Token);
	}

	public async create(user_id: string, info: number): Promise<Token> {
		const token = this.repository.create({ user_id, info });
		await this.repository.save(token);
		return token;
	}

	public async delete(token: Token): Promise<void> {
		await this.repository.remove(token);
	}

	public async findByToken(token: string): Promise<Token | undefined> {
		const tokenFind = await this.repository.findOne({ where: { token } });
		return tokenFind;
	}
}

export { TokensRepository };
