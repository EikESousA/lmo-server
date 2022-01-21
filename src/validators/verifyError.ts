/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, NextFunction, Response } from 'express';

import joiConfig from '@configs/joi';
import { ObjectSchema } from '@hapi/joi';

interface IResponse {
	request: Request;
	response: Response;
	next: NextFunction;
	schema: ObjectSchema<any>;
}

function verifyError({ request, response, next, schema }: IResponse): any {
	const validated = schema.validate(request.body, joiConfig);

	if (validated.error) {
		return response.status(400).json({
			data: null,
			message: validated?.error?.details[0]?.message.replace(/[/,"]/g, ''),
		});
	}

	return next();
}

export { verifyError };
