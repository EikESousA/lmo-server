import 'dotenv/config';

import { ConnectionOptions } from 'typeorm';

const database = {
	dev: 'luar-dev',
	prod: 'luar-prod',
	test: 'luar-test',
};

const migrations =
	process.env.APP_ENV === 'dev'
		? ['./src/databases/migrations/*.{ts,js}']
		: ['./dist/databases/migrations/*.{ts,js}'];
const entities =
	process.env.APP_ENV === 'dev'
		? ['./src/entities/*.{ts,js}']
		: ['./dist/entities/*.{ts,js}'];
const migrationsDir =
	process.env.APP_ENV === 'dev'
		? './src/databases/migrations'
		: './dist/databases/migrations';

export default {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: process.env.POSTGRES_USERNAME || '',
	password: process.env.POSTGRES_PASSWORD || '',
	database: database[process.env.APP_ENV],
	synchronize: true,
	logging: false,
	migrationsTableName: 'migration',
	migrations,
	entities,
	cli: {
		migrationsDir,
	},
} as ConnectionOptions;
