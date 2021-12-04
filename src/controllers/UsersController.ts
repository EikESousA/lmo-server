import AppError from '@errors/AppError';
import { CreateUserService } from '@services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		try {
			const createUserService = container.resolve(CreateUserService);

			const user = await createUserService.execute({
				name,
				email,
				password,
			});

			return response.json(user);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}
}

export { UsersController };
