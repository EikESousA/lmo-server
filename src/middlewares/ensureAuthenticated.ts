import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@configs/auth';
import { AppError } from '@errors/AppError';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token não encontrado!', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);

		const { sub } = decoded as ITokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch (err) {
		throw new AppError('JWT token inválido!', 401);
	}
}

export { ensureAuthenticated };
