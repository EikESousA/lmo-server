import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@configs/upload';

@Entity('store')
class Store {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: null, nullable: true })
	user_id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column({ default: null, nullable: true })
	cnpj: string;

	@Column({ default: null, nullable: true })
	instagram: string;

	@Column({ default: null, nullable: true })
	facebook: string;

	@Column({ default: null, nullable: true })
	address: string;

	@Column({ default: null, nullable: true })
	phone: string;

	@Column({ default: null, nullable: true })
	avatar: string;

	@Column({ default: true })
	activate: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	cnpj_formatted?: string;
	getCnpjFormatted(): string | null {
		if (!this.cnpj) {
			return null;
		}

		return this.cnpj.replace(
			/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			'$1.$2.$3/$4-$5',
		);
	}

	phone_formatted?: string;
	getPhoneFormatted(): string | null {
		if (!this.cnpj) {
			return null;
		}

		return this.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	}

	avatar_url?: string;
	getAvatar_URL(): string | null {
		if (!this.avatar) {
			return null;
		}

		switch (uploadConfig.driver) {
			case 'disk':
				return `${process.env.APP_API_URL}/store/${this.avatar}`;
			case 's3':
				return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
			default:
				return null;
		}
	}
}

export { Store };
