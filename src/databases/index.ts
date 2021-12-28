/* eslint-disable no-return-await */
import { createConnection } from 'typeorm';

(async () => await createConnection())();
