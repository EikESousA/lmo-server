import { IMailTemplateProvider } from '@providers/interfaces/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
	public async parse(): Promise<string> {
		return 'Mail content';
	}
}

export { FakeMailTemplateProvider };
