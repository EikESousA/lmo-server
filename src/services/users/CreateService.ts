import 'reflect-metadata';

import path from 'path';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IMailProvider } from '@providers/interfaces/IMailProvider';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
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
		@inject('TokensRepository')
		private tokensRepository: ITokensRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({
		name,
		email,
		password,
	}: IRequest): Promise<IResponse> {
		console.log('Inicia');

		const userAlreadyExists = await this.usersRepository.findByEmail({
			email,
			select: ['id'],
		});

		console.log('userAlreadyExists', userAlreadyExists);

		if (userAlreadyExists) {
			log(`❌ Usuário já existe - EMAIL: ${email}`);
			throw new AppError('Usuário já existe!', 400);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		console.log('hashedPassword', hashedPassword);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		console.log('user', user);

		const session = await this.tokensRepository.create(user.id, 1);

		console.log('session', session);

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
