import { container } from 'tsyringe';

import repositoryConfig from '@configs/repository';
import { FakeAddressesRepository } from '@repositories/Addresses/fakes/FakeAddressesRepository';
import { AddressesRepository } from '@repositories/Addresses/implementations/AddressesRepository';
import { IAddressesRepository } from '@repositories/Addresses/interfaces/IAddressesRepository';

const addressesRepositories = {
	fake: FakeAddressesRepository,
	db: AddressesRepository,
};

container.registerSingleton<IAddressesRepository>(
	'AddressesRepository',
	addressesRepositories[repositoryConfig.repository],
);
