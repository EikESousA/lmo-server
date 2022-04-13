import 'reflect-metadata';

import path from 'path';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IMailProvider } from '@providers/interfaces/IMailProvider';
import { ISessionsRepository } from '@repositories/interfaces/ISessionsRepository';
import { IUsersRepository } from '@repositories/interfaces/Users/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

interface IResponse {
	data: null;
	message: string;
}

@injectable()
class CreateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
		@inject('SessionsRepository')
		private sessionsRepository: ISessionsRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({
		name,
		email,
		password,
	}: IRequest): Promise<IResponse> {
		const userAlreadyExists = await this.usersRepository.findByEmail({
			email,
			select: ['id'],
		});

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

		const session = await this.sessionsRepository.create(user.id, 1);

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
					image: `https://luar-roupaseacessorios.s3.us-east-2.amazonaws.com/assets/stamp_white.png`,
					name,
					link: `${process.env.APP_WEB_URL}/usuario/confirmar?token=${session.token}`,
				},
			},
		});

		log(`🧑 Usuário criado - EMAIL: ${email}`);

		return {
			data: null,
			message:
				'Usuário criado com sucesso! Por favor verifique sua caixa de e-mail para ativar sua conta.',
		};
	}
}

export { CreateService };
