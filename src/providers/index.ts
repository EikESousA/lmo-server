import { container } from 'tsyringe';

import mailConfig from '@configs/mail';
import uploadConfig from '@configs/upload';
import { BCryptHashProvider } from '@providers/implementations/BCryptHashProvider';
import { DiskStorageProvider } from '@providers/implementations/DiskStorageProvider';
import { EtherealMailProvider } from '@providers/implementations/EtherealMailProvider';
import { HandlebarsMailTemplateProvider } from '@providers/implementations/HandlebarsMailTemplateProvider';
import { S3StorageProvider } from '@providers/implementations/S3StorageProvider';
import { SESMailProvider } from '@providers/implementations/SESMailProvider';
import { IHashProvider } from '@providers/interfaces/IHashProvider';
import { IMailProvider } from '@providers/interfaces/IMailProvider';
import { IMailTemplateProvider } from '@providers/interfaces/IMailTemplateProvider';
import { IStorageProvider } from '@providers/interfaces/IStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

const storageProviders = {
	disk: DiskStorageProvider,
	s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	storageProviders[uploadConfig.driver],
);

container.registerSingleton<IMailTemplateProvider>(
	'MailTemplateProvider',
	HandlebarsMailTemplateProvider,
);

const mailProviders = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailProviders[mailConfig.driver],
);
