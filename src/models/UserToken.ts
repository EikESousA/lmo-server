import { v4 as uuidV4 } from 'uuid';

class UserToken {
	id: string;
	token: string;
	user_id: string;
	info: number;
	created_at: Date;
	updated_at: Date;

	// Info - [0: esqueceu | 1: criar]

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
		if (!this.token) {
			this.token = uuidV4();
		}
		if (!this.created_at) {
			this.created_at = new Date();
		}
		if (!this.updated_at) {
			this.updated_at = new Date();
		}
	}
}

export { UserToken };
