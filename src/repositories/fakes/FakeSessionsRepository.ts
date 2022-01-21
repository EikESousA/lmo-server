import { Session } from '@entities/Session';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';

class FakeSessionsRepository implements ISessionsRepository {
	private sessions: Session[];

	constructor() {
		this.sessions = [];
	}

	public listRepository(): Session[] {
		return this.sessions;
	}

	public async generate(user_id: string, info: number): Promise<Session> {
		const session = new Session();

		Object.assign(session, {
			user_id,
			info,
		});

		this.sessions.push(session);

		return session;
	}

	public async findByToken(token: string): Promise<Session | undefined> {
		const session = this.sessions.find(session => session.token === token);

		return session;
	}

	public async deleteSession(session: Session): Promise<void> {
		const updatedSessions = [...this.sessions];

		const sessionIndex = updatedSessions.findIndex(
			sessionFind => sessionFind.id === session.id,
		);

		if (sessionIndex >= 0) {
			updatedSessions.splice(sessionIndex, 1);
		}
	}
}

export { FakeSessionsRepository };
