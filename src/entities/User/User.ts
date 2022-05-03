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
	password: string;

	@Column({ default: null, nullable: true })
	phone: string;

	@Column({ default: null, nullable: true })
	avatar: string;

	@Column({ default: 2 })
	level: number; // {0: admin, 1:manager, 2:user}

	@Column({ default: false })
	activate: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	avatarUrl?: string;
	getAvatar_URL(): string | null {
		if (!this.avatar) {
			return null;
		}

		switch (uploadConfig.driver) {
			case 'disk':
				return `${process.env.APP_API_URL}/user/${this.avatar}`;
			case 's3':
				return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
			default:
				return null;
		}
	}
}

export { User };
