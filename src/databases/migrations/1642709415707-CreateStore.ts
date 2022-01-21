import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStore1642709415707 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'store',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: true,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'cnpj',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'instagram',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'facebook',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'address',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'phone',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'avatar',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'activate',
						type: 'boolean',
						default: 'true',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'Store',
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('store');
	}
}
