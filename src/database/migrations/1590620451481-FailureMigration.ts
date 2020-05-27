import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class FailureMigration1590620451481
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'failures',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ticket',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'failure_origin_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'effects',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'failure_category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'time',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int8',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('failures');
  }
}
