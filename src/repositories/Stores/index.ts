import { container } from 'tsyringe';

import { StoresRepository } from '@repositories/Stores/implementations/StoresRepository';
import { IStoresRepository } from '@repositories/Stores/interfaces/IStoresRepository';

container.registerSingleton<IStoresRepository>(
	'StoresRepository',
	StoresRepository,
);
