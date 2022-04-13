import { container } from 'tsyringe';

import { TokensRepository } from '@repositories/Users/implementations/TokensRepository';
import { UsersRepository } from '@repositories/Users/implementations/UsersRepository';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ITokensRepository>(
	'TokensRepository',
	TokensRepository,
);
