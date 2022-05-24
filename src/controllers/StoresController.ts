import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ActivateService } from '@services/Stores/ActivateService.service';
import { AddressService } from '@services/Stores/AddressService.service';
import { AvatarService } from '@services/Stores/AvatarService.service';
import { CreateService } from '@services/Stores/CreateService.service';
import { ListService } from '@services/Stores/ListService.service';
import { ShowService } from '@services/Stores/ShowService.service';
import { UpdateService } from '@services/Stores/UpdateService.service';

class StoresController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, phone, instagram, facebook, cnpj } = request.body;

		const createService = container.resolve(CreateService);

		const dataService = await createService.execute({
			name,
			email,
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
		const { id, name, email, cnpj, facebook, instagram, phone } = request.body;

		const updateService = container.resolve(UpdateService);

		const dataService = await updateService.execute({
			id,
			name,
			email,
			cnpj,
			facebook,
			instagram,
			phone,
		});

		return response.json(dataService);
	}

	public async activate(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id, activate } = request.body;

		const activateService = container.resolve(ActivateService);

		const dataService = await activateService.execute({
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

	public async address(
		request: Request,
		response: Response,
	): Promise<Response> {
		const {
			storeId,
			addressId,
			street,
			district,
			number,
			cep,
			city,
			state,
			country,
			url,
		} = request.body;

		const addressService = container.resolve(AddressService);

		const dataService = await addressService.execute({
			storeId,
			addressId,
			street,
			district,
			number,
			cep,
			city,
			state,
			country,
			url,
		});
		return response.json(dataService);
	}
}

export { StoresController };
