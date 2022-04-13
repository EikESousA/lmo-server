import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateStore0000000000003 implements MigrationInterface {
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
						name: 'url',
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
				name: 'address_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'store',
			new TableForeignKey({
				columnNames: ['address_id'],
				referencedTableName: 'address',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('store');

		const foreignKey = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('address_id') !== -1,
		);
		await queryRunner.dropForeignKey('store', foreignKey);

		await queryRunner.dropColumn('store', 'address_id');

		await queryRunner.dropTable('store');
	}
}
