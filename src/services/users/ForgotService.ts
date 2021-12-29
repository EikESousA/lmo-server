import 'reflect-metadata';
import { AppError } from '@errors/AppError';
import { IMailProvider } from '@providers/interfaces/IMailProvider';
import { IUsersRepository } from '@repositories/interfaces/IUsersRepository';
import { IUsersTokenRepository } from '@repositories/interfaces/IUsersTokenRepository';
import { log } from '@utils/log';
import path from 'path';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	email: string;
}

@injectable()
class ForgotService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('UsersTokenRepository')
		private usersTokenRepository: IUsersTokenRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			log(`❌ Usuário não existe - EMAIL: ${email}`);
			throw new AppError('Usuário não existe!', 400);
		}

		const { token } = await this.usersTokenRepository.generate(user.id, 0);

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
					link: `${process.env.APP_WEB_URL}/resetar?token=${token}`,
				},
			},
		});

		log(`🧑 Usuário esqueceu senha - EMAIL: ${email}`);
	}
}

export { ForgotService };
