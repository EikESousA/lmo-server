import 'reflect-metadata';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IMailProvider } from '@providers/interfaces/IMailProvider';
import { ITokensRepository } from '@repositories/Users/interfaces/ITokensRepository';
import { IUsersRepository } from '@repositories/Users/interfaces/IUsersRepository';
import { log } from '@utils/log';

interface IRequest {
	email: string;
}

interface IResponse {
	data: null;
	message: string;
}

@injectable()
class ForgotService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('TokensRepository')
		private tokensRepository: ITokensRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({ email }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail({
			email,
			select: ['id', 'name', 'email'],
		});

		if (!user) {
			log(`❌ Usuário não existe - EMAIL: ${email}`);
			throw new AppError('Usuário não existe!', 400);
		}

		const { token } = await this.tokensRepository.create(user.id, 0);

		const forgotTemplateDir = path.resolve(
			__dirname,
			'..',
			'..',
			'views',
			'forgot.hbs',
		);

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[Luar] Recuperação de senha!',
			templateData: {
				file: forgotTemplateDir,
				variables: {
					image: `https://luar-roupaseacessorios.s3.us-east-2.amazonaws.com/assets/stamp_white.png`,
					name: user.name,
					link: `${process.env.APP_WEB_URL}/usuario/resetar?token=${token}`,
				},
			},
		});

		log(`🧑 Usuário esqueceu senha - EMAIL: ${email}`);

		return {
			data: null,
			message:
				'Por favor acesse seu e-mail e siga as instruções para recuperar a senha!',
		};
	}
}

export { ForgotService };
