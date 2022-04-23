import { Router } from 'express';

import { AddressesController } from '@controllers/AddressesController';
import AddressesValidator from '@validators/AddressesValidator';

const addressesRoutes = Router();

const addressesController = new AddressesController();

addressesRoutes.post(
	'/create',
	AddressesValidator.create,
	addressesController.create,
);
addressesRoutes.post(
	'/show',
	AddressesValidator.show,
	addressesController.show,
);
addressesRoutes.post(
	'/update',
	AddressesValidator.update,
	addressesController.update,
);

export { addressesRoutes };
