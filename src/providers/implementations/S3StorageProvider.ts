import uploadConfig from '@configs/upload';
import { IStorageProvider } from '@providers/models/IStorageProvider';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new aws.S3({
			region: process.env.AWS_BUCKET_REGION,
			apiVersion: '2006-03-01',
		});
	}

	public async saveFile(file: string, folder: string): Promise<string> {
		const originalPath = path.resolve(uploadConfig.tmpFolder, file);

		const ContentType = mime.getType(originalPath);

		if (!ContentType) {
			throw new Error('File not found!');
		}

		const fileContent = await fs.promises.readFile(originalPath);

		await this.client
			.putObject({
				Bucket: `${process.env.AWS_BUCKET}/${folder}`,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
				ContentDisposition: `inline; filename=${file}`,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return file;
	}

	public async deleteFile(file: string, folder: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: `${process.env.AWS_BUCKET}/${folder}`,
				Key: file,
			})
			.promise();
	}
}

export { S3StorageProvider };
