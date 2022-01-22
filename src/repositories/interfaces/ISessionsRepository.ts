import { Session } from '@entities/Session';

interface ISessionsRepository {
	create(user_id: string, info: number): Promise<Session>;
	delete(session: Session): Promise<void>;
	findByToken(token: string): Promise<Session | undefined>;
}

export { ISessionsRepository };
