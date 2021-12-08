import uploadConfig from '@configs/upload';
import { IStorageProvider } from '@providers/models/IStorageProvider';
import fs from 'fs';
import path from 'path';

class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string, folder: string): Promise<string> {
		await fs.promises.rename(
			path.resolve(uploadConfig.tmpFolder, file),
			path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
		);
		return file;
	}

	public async deleteFile(file: string, folder: string): Promise<void> {
		const filePath = path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

		try {
			await fs.promises.stat(filePath);
		} catch {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}

export { DiskStorageProvider };
