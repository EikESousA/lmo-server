import { container } from 'tsyringe';

import { SessionsRepository } from '@repositories/implementations/SessionsRepository';
import { UsersRepository } from '@repositories/implementations/UsersRepository';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';

import { StoresRepository } from './implementations/StoresRepository';
import { IStoresRepository } from './interfaces/IStoresRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ISessionsRepository>(
	'SessionsRepository',
	SessionsRepository,
);

container.registerSingleton<IStoresRepository>(
	'StoresRepository',
	StoresRepository,
);
