import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class Address {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	street: string;

	@Column()
	district: string;

	@Column()
	number: string;

	@Column()
	cep: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	country: string;

	@Column({ default: null, nullable: true })
	url?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	cepFormatted?: string;
	getCepFormatted(): string | null {
		if (!this.cep) {
			return null;
		}

		return this.cep.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
	}
}

export { Address };
