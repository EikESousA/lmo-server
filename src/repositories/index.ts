import { UsersRepository } from '@repositories/implementations/UsersRepository';
import { UsersTokenRepository } from '@repositories/implementations/UsersTokenRepository';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
	'UsersTokenRepository',
	UsersTokenRepository,
);
