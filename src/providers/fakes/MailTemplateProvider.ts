import { IMailTemplateProvider } from '@providers/models/IMailTemplateProvider';

class MailTemplateProvider implements IMailTemplateProvider {
	public async parse(): Promise<string> {
		return 'Mail content';
	}
}

export { MailTemplateProvider };
