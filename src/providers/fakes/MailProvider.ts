import { IMailProvider, ISendMailDTO } from '@providers/models/IMailProvider';

class MailProvider implements IMailProvider {
	private messages: ISendMailDTO[] = [];

	public async sendMail(message: ISendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}

export { MailProvider };
