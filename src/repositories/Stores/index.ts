import { container } from 'tsyringe';

import repositoryConfig from '@configs/repository';
import { FakeStoresRepository } from '@repositories/Stores/fakes/FakeStoresRepository';
import { StoresRepository } from '@repositories/Stores/implementations/StoresRepository';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';

const storesRepositories = {
	fake: FakeStoresRepository,
	db: StoresRepository,
};

container.registerSingleton<IStoresRepository>(
	'StoresRepository',
	storesRepositories[repositoryConfig.repository],
);
