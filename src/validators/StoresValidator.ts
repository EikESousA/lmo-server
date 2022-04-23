import { Request, Response, NextFunction } from 'express';

import Joi from '@hapi/joi';
import { verifyError } from '@validators/verifyError';

class StoresValidator {
	create(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().required().label('Nome'),
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.required()
				.label('Email'),
			cnpj: Joi.string().label('CNPJ'),
			address: Joi.string().label('Endereço'),
			phone: Joi.string().label('Telefone'),
			instagram: Joi.string().label('Instagram'),
			facebook: Joi.string().label('Facebook'),
		});

		return verifyError({ request, response, next, schema });
	}

	list(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({});

		return verifyError({ request, response, next, schema });
	}

	update(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
			name: Joi.string().label('Nome'),
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.label('Email'),
			cnpj: Joi.string().label('CNPJ'),
			address: Joi.string().label('Endereço'),
			phone: Joi.string().label('Telefone'),
			instagram: Joi.string().label('Instagram'),
			facebook: Joi.string().label('Facebook'),
		});

		return verifyError({ request, response, next, schema });
	}

	activate(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
			activate: Joi.boolean().required().label('Campo ativo'),
		});

		return verifyError({ request, response, next, schema });
	}

	show(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
		});

		return verifyError({ request, response, next, schema });
	}

	avatar(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			id: Joi.string().required().label('ID'),
		});

		return verifyError({ request, response, next, schema });
	}
}

export default new StoresValidator();
