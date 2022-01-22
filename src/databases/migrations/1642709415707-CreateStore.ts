import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

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
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
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
			}),
		);

		await queryRunner.addColumn(
			'store',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('store');

		const foreignKey = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('user_id') !== -1,
		);
		await queryRunner.dropForeignKey('store', foreignKey);

		await queryRunner.dropColumn('store', 'user_id');

		await queryRunner.dropTable('store');
	}
}
