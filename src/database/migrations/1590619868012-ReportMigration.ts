import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class ReportMigration1590619868012
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'exibition_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'failures',
            type: 'varchar',
            isNullable: false,
            isArray: true,
          },
          {
            name: 'members_id',
            type: 'varchar',
            isNullable: false,
            isArray: true,
          },
          {
            name: 'comments',
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
    await queryRunner.dropTable('reports');
  }
}
