import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ActivateService } from '@services/Users/ActivateService';
import { AvatarService } from '@services/Users/AvatarService';
import { CreateService } from '@services/Users/CreateService';
import { ForgotService } from '@services/Users/ForgotService';
import { ListService } from '@services/Users/ListService';
import { ResetService } from '@services/Users/ResetService';
import { SessionService } from '@services/Users/SessionService';
import { ShowService } from '@services/Users/ShowService';
import { UpdateService } from '@services/Users/UpdateService';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		console.log('body');

		const createService = container.resolve(CreateService);

		console.log('createService');

		const dataService = await createService.execute({
			name,
			email,
			password,
		});

		return response.json(dataService);
	}

	public async forgot(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;

		const forgotService = container.resolve(ForgotService);

		const dataService = await forgotService.execute({
			email,
		});

		return response.json(dataService);
	}

	public async reset(request: Request, response: Response): Promise<Response> {
		const { token, password } = request.body;

		const resetService = container.resolve(ResetService);

		const dataService = await resetService.execute({
			token,
			password,
		});

		return response.json(dataService);
	}

	public async session(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;

		const sessionService = container.resolve(SessionService);

		const dataService = await sessionService.execute({
			email,
			password,
		});

		return response.json(dataService);
	}

	public async activate(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { token } = request.body;

		const activateService = container.resolve(ActivateService);

		const dataService = await activateService.execute({
			token,
		});

		return response.json(dataService);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const showService = container.resolve(ShowService);

		const dataService = await showService.execute({
			id,
		});

		return response.json(dataService);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const { name, email, phone, oldPassword, password } = request.body;

		const updateService = container.resolve(UpdateService);

		const dataService = await updateService.execute({
			id,
			name,
			email,
			phone,
			oldPassword,
			password,
		});

		return response.json(dataService);
	}

	public async avatar(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const fileName = request.file?.filename;

		if (fileName) {
			const avatarService = container.resolve(AvatarService);

			const dataService = await avatarService.execute({
				id,
				fileName,
			});
			return response.json(dataService);
		}

		return response.status(400).send();
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const listService = container.resolve(ListService);

		const dataService = await listService.execute({ id });

		return response.json(dataService);
	}
}

export { UsersController };
