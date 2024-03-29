import { IParseMailTemplateDTO } from '@providers/interfaces/IMailTemplateProvider';

interface IMailContact {
	name: string;
	email: string;
}

interface ISendMailDTO {
	to: IMailContact;
	from?: IMailContact;
	subject: string;
	templateData: IParseMailTemplateDTO;
}

interface IMailProvider {
	sendMail(data: ISendMailDTO): Promise<void>;
}

export { IMailProvider, ISendMailDTO };
