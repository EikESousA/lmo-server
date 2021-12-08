import { AppError } from '@errors/AppError';
import { AvatarService } from '@services/users/AvatarService';
import { CreateService } from '@services/users/CreateService';
import { ForgotService } from '@services/users/ForgotService';
import { ResetService } from '@services/users/ResetService';
import { SessionService } from '@services/users/SessionService';
import { ShowService } from '@services/users/ShowService';
import { UpdateService } from '@services/users/UpdateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
	public async avatar(request: Request, response: Response): Promise<Response> {
		const userId = request.user.id;
		const avatarFileName = request.file?.filename;

		if (avatarFileName) {
			try {
				const avatarService = container.resolve(AvatarService);

				const user = await avatarService.execute({
					userId,
					avatarFileName,
				});
				return response.json(user);
			} catch (error) {
				if (error instanceof AppError) {
					return response
						.status(error.statusCode)
						.json({ error: error.message });
				}
				return response.json(error);
			}
		}

		return response.status(400).send();
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		try {
			const createService = container.resolve(CreateService);

			const user = await createService.execute({
				name,
				email,
				password,
			});

			return response.json({ user });
		} catch (error) {
			const logError = error as AppError;
			return response
				.status(logError.statusCode)
				.json({ error: logError.message });
		}
	}

	public async forgot(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;

		try {
			const forgotService = container.resolve(ForgotService);

			await forgotService.execute({
				email,
			});

			return response.status(204).json();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}

	public async reset(request: Request, response: Response): Promise<Response> {
		const { token, password } = request.body;

		try {
			const resetService = container.resolve(ResetService);

			await resetService.execute({
				token,
				password,
			});

			return response.status(204).json();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}

	public async session(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;

		try {
			const sessionService = container.resolve(SessionService);

			const { user, token } = await sessionService.execute({
				email,
				password,
			});

			return response.json({ user, token });
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const userId = request.user.id;

		try {
			const showService = container.resolve(ShowService);

			const user = await showService.execute({
				userId,
			});

			return response.status(200).json({ user });
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const userId = request.user.id;
		const { name, email, oldPassword, password } = request.body;

		try {
			const updateService = container.resolve(UpdateService);

			const user = await updateService.execute({
				userId,
				name,
				email,
				oldPassword,
				password,
			});

			return response.status(204).json({ user });
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.json(error);
		}
	}
}

export { UsersController };
