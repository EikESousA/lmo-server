import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress0000000000002 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'address',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'street',
						type: 'varchar',
					},
					{
						name: 'number',
						type: 'varchar',
					},
					{
						name: 'district',
						type: 'varchar',
					},
					{
						name: 'cep',
						type: 'varchar',
					},
					{
						name: 'city',
						type: 'varchar',
					},
					{
						name: 'state',
						type: 'varchar',
					},
					{
						name: 'url',
						type: 'varchar',
						isNullable: true,
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('address');
	}
}
