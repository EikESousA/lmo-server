import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('store_address')
class StoreAddress {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	id_store: string;

	@Column()
	street: string;

	@Column()
	number: string;

	@Column({ default: null, nullable: true })
	cep: string;

	@Column({ default: null, nullable: true })
	city: string;

	@Column({ default: null, nullable: true })
	state: string;

	@Column({ default: null, nullable: true })
	country: string;

	@Column({ default: null, nullable: true })
	url: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreAddress };
