import { Connection, createConnection } from 'typeorm';

import databaseConfig from '@configs/database';

export default async (): Promise<Connection> => {
	return createConnection(databaseConfig);
};
