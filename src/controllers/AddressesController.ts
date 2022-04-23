import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateService } from '@services/Addresses/CreateService';
import { ShowService } from '@services/Addresses/ShowService';
import { UpdateService } from '@services/Addresses/UpdateService';

class AddressesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { street, district, number, cep, city, state, country, url } =
			request.body;

		const createService = container.resolve(CreateService);

		const dataService = await createService.execute({
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

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;

		const showService = container.resolve(ShowService);

		const dataService = await showService.execute({
			id,
		});

		return response.json(dataService);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, street, district, number, cep, city, state, country, url } =
			request.body;

		const updateService = container.resolve(UpdateService);

		const dataService = await updateService.execute({
			id,
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

export { AddressesController };
