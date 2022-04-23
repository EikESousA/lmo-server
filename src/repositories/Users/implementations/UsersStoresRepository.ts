import { Repository, getRepository } from 'typeorm';

import { UserStore } from '@entities/User/UserStore';
import {
	IUsersStoreRepository,
	ISessionDTO,
} from '@repositories/Users/interfaces/IUsersStoreRepository';

class UsersStoreRepository implements IUsersStoreRepository {
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

export { UsersStoreRepository };
