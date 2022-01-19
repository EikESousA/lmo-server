import { Exclude, Expose } from 'class-transformer';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@configs/upload';

@Entity('user')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column({ default: null, nullable: true })
	phone: string;

	@Column({ default: null, nullable: true })
	avatar: string;

	@Column({ default: 1 })
	level: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

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
