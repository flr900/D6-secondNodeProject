import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class ExibitionMigration1590618870586
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'exibitions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'start_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'finish_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'ready_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'exibition_date',
            type: 'timestamp',
            isNullable: false,
            isUnique: true,
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('exibitions');
  }
}
