import { Request, Response, NextFunction } from 'express';

import Joi from '@hapi/joi';
import { verifyError } from '@validators/verifyError';

class AddressesValidator {
	create(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			street: Joi.string().required().label('Rua'),
			district: Joi.string().required().label('Bairro'),
			number: Joi.string().required().label('Número'),
			cep: Joi.string().required().label('CEP'),
			city: Joi.string().required().label('Cidade'),
			state: Joi.string().required().label('Estado'),
			country: Joi.string().required().label('País'),
			url: Joi.string().label('Link'),
		});

		return verifyError({ request, response, next, schema });
	}

	show(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
		});

		return verifyError({ request, response, next, schema });
	}

	update(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
			street: Joi.string().required().label('Rua'),
			district: Joi.string().required().label('Bairro'),
			number: Joi.string().required().label('Número'),
			cep: Joi.string().required().label('CEP'),
			city: Joi.string().required().label('Cidade'),
			state: Joi.string().required().label('Estado'),
			country: Joi.string().required().label('País'),
			url: Joi.string().label('Link'),
		});

		return verifyError({ request, response, next, schema });
	}
}

export default new AddressesValidator();
