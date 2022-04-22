import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('store_category')
class StoreCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'store_id' })
	storeId: string;

	@Column({ name: 'category_id' })
	categoryId: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreCategory };
