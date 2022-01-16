import { container } from 'tsyringe';

import { UsersRepository } from '@repositories/implementations/UsersRepository';
import { UsersTokenRepository } from '@repositories/implementations/UsersTokenRepository';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
	'UsersTokenRepository',
	UsersTokenRepository,
);
