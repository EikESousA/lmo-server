import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	id: string;
}

interface IResponse {
	data: User[];
	message: string;
}

@injectable()
class ListService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ id }: IRequest): Promise<IResponse> {
		const users = await this.usersRepository.findAllUsers({
			id,
			select: ['id', 'name', 'email', 'phone', 'activate'],
		});

		log(`🧑 Listando todos usuários`);

		return { data: users, message: 'Usuários listados com sucesso!' };
	}
}

export { ListService };
