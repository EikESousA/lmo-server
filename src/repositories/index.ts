import { UsersRepository } from '@repositories/fakes/UsersRepository';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
