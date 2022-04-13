import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateStoreSize0000000000010 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'store_size',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
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
			'store_size',
			new TableColumn({
				name: 'store_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'store_size',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.addColumn(
			'store_size',
			new TableColumn({
				name: 'size_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'store_size',
			new TableForeignKey({
				columnNames: ['size_id'],
				referencedTableName: 'category',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('store_size');

		const foreignKeyStore = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('store_id') !== -1,
		);

		await queryRunner.dropForeignKey('store_size', foreignKeyStore);

		await queryRunner.dropColumn('store_size', 'store_id');

		const foreignKeyCategory = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('size_id') !== -1,
		);

		await queryRunner.dropForeignKey('store_size', foreignKeyCategory);

		await queryRunner.dropColumn('store_size', 'size_id');

		await queryRunner.dropTable('store_size');
	}
}
