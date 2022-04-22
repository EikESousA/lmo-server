import { container } from 'tsyringe';

import repositoryConfig from '@configs/repository';
import { FakeTokensRepository } from '@repositories/Users/fakes/FakeTokenRepository';
import { FakeUsersRepository } from '@repositories/Users/fakes/FakeUsersRepository';
import { TokensRepository } from '@repositories/Users/implementations/TokensRepository';
import { UsersRepository } from '@repositories/Users/implementations/UsersRepository';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';

const usersRepositories = {
	fake: FakeUsersRepository,
	implementation: UsersRepository,
};

const tokensRepositories = {
	fake: FakeTokensRepository,
	implementation: TokensRepository,
};

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	usersRepositories[repositoryConfig.repository],
);

container.registerSingleton<ITokensRepository>(
	'TokensRepository',
	tokensRepositories[repositoryConfig.repository],
);
