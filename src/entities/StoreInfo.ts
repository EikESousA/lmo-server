import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('store_info')
class StoreInfo {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	id_store: string;

	@Column()
	id_icon: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreInfo };
