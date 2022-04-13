import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateToken0000000000006 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'token',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'token',
						type: 'uuid',
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'info',
						type: 'int',
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
			'token',
			new TableColumn({
				name: 'user_store_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'token',
			new TableForeignKey({
				columnNames: ['user_store_id'],
				referencedTableName: 'user_store',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('token');

		const foreignKey = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('user_store_id') !== -1,
		);

		await queryRunner.dropForeignKey('token', foreignKey);

		await queryRunner.dropColumn('token', 'user_store_id');

		await queryRunner.dropTable('token');
	}
}
