import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('user_store')
class UserStore {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'user_id' })
	userId: string;

	@Column({ name: 'store_id' })
	storeId: string;

	@Column({ default: 0 })
	level: number; // {0: admin, 1:manager, 2:user}

	@Column({ default: true })
	activate: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { UserStore };
