import { container } from 'tsyringe';

import { SessionsRepository } from '@repositories/implementations/SessionsRepository';
import { UsersRepository } from '@repositories/implementations/UsersRepository';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ISessionsRepository>(
	'SessionsRepository',
	SessionsRepository,
);
