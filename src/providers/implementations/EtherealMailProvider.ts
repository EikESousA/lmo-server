import { IMailProvider, ISendMailDTO } from '@providers/models/IMailProvider';
import { IMailTemplateProvider } from '@providers/models/IMailTemplateProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider,
	) {
		nodemailer.createTestAccount().then(account => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});
			this.client = transporter;
		});
	}

	public async sendMail({
		from,
		to,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const message = await this.client.sendMail({
			from: {
				name: from?.name || 'Equipe Luar',
				address: from?.email || 'equipe@luar.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});

		console.log(`Message sent: ${message.messageId}`);
		console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
	}
}

export { EtherealMailProvider };
