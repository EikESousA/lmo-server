/* eslint-disable @typescript-eslint/ban-types */
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
	driver: 'disk' | 's3';

	tmpFolder: string;

	multer: {
		storage: StorageEngine;
	};

	config: {
		disk: {};
		aws: {
			bucket: string;
		};
	};
}

export default {
	driver: process.env.STORAGE_DRIVER || 'disk',

	tmpFolder,

	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex');
				const fileName = `${fileHash}-${file.originalname}`;
				return callback(null, fileName);
			},
		}),
	},

	config: {
		disk: {},
		aws: {
			bucket: process.env.AWS_BUCKET,
		},
	},
} as IUploadConfig;
