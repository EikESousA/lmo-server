import { UsersRepository } from '@repositories/fakes/UsersRepository';
import { UsersTokenRepository } from '@repositories/fakes/UsersTokenRepository';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/models/IUsersTokenRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
	'UsersTokenRepository',
	UsersTokenRepository,
);
