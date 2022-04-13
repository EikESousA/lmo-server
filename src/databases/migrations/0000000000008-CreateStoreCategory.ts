import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateStoreCategory0000000000008 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'store_category',
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
			'store_category',
			new TableColumn({
				name: 'store_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'store_category',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.addColumn(
			'store_category',
			new TableColumn({
				name: 'category_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'store_category',
			new TableForeignKey({
				columnNames: ['category_id'],
				referencedTableName: 'category',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('store_category');

		const foreignKeyStore = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('store_id') !== -1,
		);

		await queryRunner.dropForeignKey('store_category', foreignKeyStore);

		await queryRunner.dropColumn('store_category', 'store_id');

		const foreignKeyCategory = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('category_id') !== -1,
		);

		await queryRunner.dropForeignKey('store_category', foreignKeyCategory);

		await queryRunner.dropColumn('store_category', 'category_id');

		await queryRunner.dropTable('store_category');
	}
}
