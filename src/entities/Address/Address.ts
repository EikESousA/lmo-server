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

	@Column()
	url: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { Address };
