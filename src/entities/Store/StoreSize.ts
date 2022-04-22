import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('store_size')
class StoreSize {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'store_id' })
	storeId: string;

	@Column({ name: 'size_id' })
	sizeId: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { StoreSize };
