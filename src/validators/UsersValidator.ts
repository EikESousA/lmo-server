import { Request, Response, NextFunction } from 'express';

import Joi from '@hapi/joi';
import { verifyError } from '@validators/verifyError';

class UsersValidator {
	create(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().required().label('Nome'),
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.required()
				.label('Email'),
			password: Joi.string().required().label('Senha'),
		});

		return verifyError({ request, response, next, schema });
	}

	forgot(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.required()
				.label('Email'),
		});

		return verifyError({ request, response, next, schema });
	}

	reset(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			token: Joi.string().required().label('Token'),
			password: Joi.string().required().label('Senha'),
		});

		return verifyError({ request, response, next, schema });
	}

	session(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.required()
				.label('Email'),
			password: Joi.string().required().label('Senha'),
		});

		return verifyError({ request, response, next, schema });
	}

	activate(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			token: Joi.string().required().label('Token'),
		});

		return verifyError({ request, response, next, schema });
	}

	show(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys();

		return verifyError({ request, response, next, schema });
	}

	update(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().label('Nome'),
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.label('Email'),
			phone: Joi.string().label('Telefone'),
			password: Joi.string().label('Senha'),
			oldPassword: Joi.string().label('Senha antiga'),
		});

		return verifyError({ request, response, next, schema });
	}

	avatar(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys();

		return verifyError({ request, response, next, schema });
	}

	list(request: Request, response: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().required().label('Nome'),
			email: Joi.string()
				.email({ tlds: { allow: false } })
				.required()
				.label('Email'),
			password: Joi.string().required().label('Senha'),
		});

		return verifyError({ request, response, next, schema });
	}
}

export default new UsersValidator();
