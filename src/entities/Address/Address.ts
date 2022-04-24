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
	url?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}

export { Address };
