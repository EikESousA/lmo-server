import { Session } from '@entities/Session';

interface ISessionsRepository {
	generate(user_id: string, info: number): Promise<Session>;
	findByToken(token: string): Promise<Session | undefined>;
	deleteSession(session: Session): Promise<void>;
}

export { ISessionsRepository };
