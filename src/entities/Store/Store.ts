import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';

import uploadConfig from '@configs/upload';
import { Address } from '@entities/Address/Address';

@Entity('store')
class Store {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'address_id', default: null, nullable: true })
	addressId?: string;

	@OneToOne(() => Address)
	@JoinColumn({ name: 'address_id' })
	address: Address;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column({ default: null, nullable: true })
	cnpj?: string;

	@Column({ default: null, nullable: true })
	instagram?: string;

	@Column({ default: null, nullable: true })
	facebook?: string;

	@Column({ default: null, nullable: true })
	phone: string;

	@Column({ default: null, nullable: true })
	avatar?: string;

	@Column({ default: null, nullable: true })
	url?: string;

	@Column({ default: true })
	activate: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	cnpjFormatted?: string;
	getCnpjFormatted(): string | null {
		if (!this.cnpj) {
			return null;
		}

		return this.cnpj.replace(
			/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			'$1.$2.$3/$4-$5',
		);
	}

	phoneFormatted?: string;
	getPhoneFormatted(): string | null {
		if (!this.cnpj) {
			return null;
		}

		return this.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	}

	avatarUrl?: string;
	getAvatarURL(): string | null {
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
