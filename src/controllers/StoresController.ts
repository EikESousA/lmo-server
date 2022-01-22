import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AvatarService } from '@services/stores/AvatarService';
import { CreateService } from '@services/stores/CreateService';
import { DisableService } from '@services/stores/DisableService';
import { LinkService } from '@services/stores/LinkService';
import { ListService } from '@services/stores/ListService';
import { ShowService } from '@services/stores/ShowService';
import { UpdateService } from '@services/stores/UpdateService';

class StoresController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, address, phone, instagram, facebook, cnpj } =
			request.body;

		const createService = container.resolve(CreateService);

		const dataService = await createService.execute({
			name,
			email,
			address,
			phone,
			instagram,
			facebook,
			cnpj,
		});

		return response.json(dataService);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listService = container.resolve(ListService);

		const dataService = await listService.execute();

		return response.json(dataService);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, name, email, address, cnpj, facebook, instagram, phone } =
			request.body;

		const updateService = container.resolve(UpdateService);

		const dataService = await updateService.execute({
			id,
			name,
			email,
			address,
			cnpj,
			facebook,
			instagram,
			phone,
		});

		return response.json(dataService);
	}

	public async link(request: Request, response: Response): Promise<Response> {
		const { id, userId } = request.body;

		const linkService = container.resolve(LinkService);

		const dataService = await linkService.execute({
			id,
			userId,
		});

		return response.json(dataService);
	}

	public async disable(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id, activate } = request.body;

		const disableService = container.resolve(DisableService);

		const dataService = await disableService.execute({
			id,
			activate,
		});

		return response.json(dataService);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;

		const showService = container.resolve(ShowService);

		const dataService = await showService.execute({
			id,
		});

		return response.json(dataService);
	}

	public async avatar(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;
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
}

export { StoresController };
