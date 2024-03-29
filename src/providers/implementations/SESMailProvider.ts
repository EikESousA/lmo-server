import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import mailConfig from '@configs/mail';
import {
	IMailProvider,
	ISendMailDTO,
} from '@providers/interfaces/IMailProvider';
import { IMailTemplateProvider } from '@providers/interfaces/IMailTemplateProvider';

@injectable()
class SESMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider,
	) {
		this.client = nodemailer.createTransport({
			SES: new aws.SES({
				apiVersion: '2010-12-01',
				region: 'us-east-2',
			}),
		});
	}

	public async sendMail({
		from,
		to,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const { name, email } = mailConfig.defaults.from;

		await this.client.sendMail({
			from: {
				name: from?.name || name,
				address: from?.email || email,
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});
	}
}

export { SESMailProvider };
