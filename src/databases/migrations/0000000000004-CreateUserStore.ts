import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateUserStore0000000000004 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_store',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'level',
						type: 'int',
						default: '0',
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
			'user_store',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'user_store',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.addColumn(
			'user_store',
			new TableColumn({
				name: 'store_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'user_store',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('user_store');

		const foreignKeyUser = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('user_id') !== -1,
		);

		await queryRunner.dropForeignKey('user_store', foreignKeyUser);

		await queryRunner.dropColumn('user_store', 'user_id');

		const foreignKeyStore = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('store_id') !== -1,
		);

		await queryRunner.dropForeignKey('user_store', foreignKeyStore);

		await queryRunner.dropColumn('user_store', 'store_id');

		await queryRunner.dropTable('user_store');
	}
}
