import { getRepository, Repository } from 'typeorm';

import { Session } from '@entities/Session';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';

class SessionsRepository implements ISessionsRepository {
	private repository: Repository<Session>;

	constructor() {
		this.repository = getRepository(Session);
	}

	public async create(user_id: string, info: number): Promise<Session> {
		const session = this.repository.create({ user_id, info });
		await this.repository.save(session);
		return session;
	}

	public async delete(session: Session): Promise<void> {
		await this.repository.remove(session);
	}

	public async findByToken(token: string): Promise<Session | undefined> {
		const session = await this.repository.findOne({ where: { token } });
		return session;
	}
}

export { SessionsRepository };
