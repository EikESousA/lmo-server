import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Generated,
} from 'typeorm';

@Entity('user_token')
class UserToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Generated('uuid')
	token: string;

	@Column()
	user_id: string;

	@Column()
	info: number;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;
}

export { UserToken };
