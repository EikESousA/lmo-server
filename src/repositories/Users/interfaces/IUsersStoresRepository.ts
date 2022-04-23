import { UserStore } from '@entities/User/UserStore';

interface ISessionDTO {
	email: string;
	password: string;
	select?: (keyof UserStore)[];
}

interface IUsersStoreRepository {
	session({
		email,
		password,
		select,
	}: ISessionDTO): Promise<UserStore | undefined>;
}

export { IUsersStoreRepository, ISessionDTO };
