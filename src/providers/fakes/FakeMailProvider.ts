import {
	IMailProvider,
	ISendMailDTO,
} from '@providers/interfaces/IMailProvider';

class FakeMailProvider implements IMailProvider {
	private messages: ISendMailDTO[] = [];

	public async sendMail(message: ISendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}

export { FakeMailProvider };
