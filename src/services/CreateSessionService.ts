import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';
import AppError from '../utils/AppError';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

class CreateSessionService {
	constructor(private usersRepository: UsersRepository) {}

	execute({ name, email, password }: IRequest): User {
		const userAlreadyExists = this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError('Usuário já existe!', 400);
		}

		const user = this.usersRepository.create({ name, email, password });

		return user;
	}
}

export { CreateSessionService };
