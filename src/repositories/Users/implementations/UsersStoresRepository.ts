import { Repository, getRepository } from 'typeorm';

import { UserStore } from '@entities/User/UserStore';
import {
	IUsersStoresRepository,
	ISessionDTO,
} from '@repositories/Users/interfaces/IUsersStoresRepository';

class UsersStoresRepository implements IUsersStoresRepository {
	private repository: Repository<UserStore>;

	constructor() {
		this.repository = getRepository(UserStore);
	}

	public async session({
		email,
		password,
		select,
	}: ISessionDTO): Promise<UserStore | undefined> {
		const user = await this.repository.findOne({
			where: { email, password },
			select,
		});

		return user;
	}
}

export { UsersStoresRepository };
