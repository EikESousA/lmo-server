import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('user')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	name: string;
	@Column()
	email: string;
	@Column()
	password: string;
	@Column()
	phone?: string;
	@Column()
	avatar?: string;
	@CreateDateColumn()
	created_at?: Date;
	@UpdateDateColumn()
	updated_at?: Date;

	@Expose({ name: 'avatar_url' })
	getAvatar_URL(): string | null {
		if (!this.avatar) {
			return null;
		}

		switch (uploadConfig.driver) {
			case 'disk':
				return `${process.env.APP_API_URL}/files/${this.avatar}`;
			case 's3':
				return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
			default:
				return null;
		}
	}
}

export { User };
