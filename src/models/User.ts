import { v4 as uuidV4 } from 'uuid';

class User {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}

		if (!this.created_at) {
			this.created_at = new Date();
		}
	}
}

export { User };
