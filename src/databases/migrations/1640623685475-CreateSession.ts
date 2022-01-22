import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class CreateSession1640623685475 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'session',
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
			'session',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'session',
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
		const table = await queryRunner.getTable('session');

		const foreignKey = table.foreignKeys.find(
			fk => fk.columnNames.indexOf('user_id') !== -1,
		);

		await queryRunner.dropForeignKey('session', foreignKey);

		await queryRunner.dropColumn('session', 'user_id');

		await queryRunner.dropTable('session');
	}
}
