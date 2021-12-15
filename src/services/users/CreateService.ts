import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import { User } from '@models/User';
import { IHashProvider } from '@providers/models/IHashProvider';
import { IMailProvider } from '@providers/models/IMailProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/models/IUsersTokenRepository';
import { log } from '@utils/log';
import path from 'path';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
		@inject('UsersTokenRepository')
		private usersTokenRepository: IUsersTokenRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			log(`❌ Usuário já existe - EMAIL: ${email}`);
			throw new AppError('Usuário já existe!', 400);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		const userToken = await this.usersTokenRepository.generate(user.id, 1);

		const createTemplateDir = path.resolve(
			__dirname,
			'..',
			'..',
			'views',
			'create.hbs',
		);

		await this.mailProvider.sendMail({
			to: {
				name,
				email,
			},
			subject: '[Luar] Recuperação de senha!',
			templateData: {
				file: createTemplateDir,
				variables: {
					name,
					link: `${process.env.APP_WEB_URL}/usuario/confirmar?token=${userToken.token}`,
				},
			},
		});

		log(`🧑 Usuário criado - EMAIL: ${email}`);

		return user;
	}
}

export { CreateService };
