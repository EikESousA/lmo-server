import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateMessage0000000000005 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'message',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'text',
						type: 'varchar',
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
			'message',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'message',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.addColumn(
			'message',
			new TableColumn({
				name: 'store_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'message',
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
		const table = await queryRunner.getTable('message');

		const foreignKeyUser = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('user_id') !== -1,
		);

		await queryRunner.dropForeignKey('message', foreignKeyUser);

		await queryRunner.dropColumn('message', 'user_id');

		const foreignKeyStore = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('store_id') !== -1,
		);

		await queryRunner.dropForeignKey('message', foreignKeyStore);

		await queryRunner.dropColumn('message', 'store_id');

		await queryRunner.dropTable('message');
	}
}
