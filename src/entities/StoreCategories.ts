import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('store_categorie')
class StoreCategories {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	id_store: string;

	@Column()
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreCategories };
