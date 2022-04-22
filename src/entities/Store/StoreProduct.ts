import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('info')
class StoreProducts {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	id_store: string;

	@Column()
	name: string;

	@Column()
	url: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreProducts };
