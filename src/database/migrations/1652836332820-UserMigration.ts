import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1637342204057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4 (),
        firstname VARCHAR ( 50 ) NOT NULL,
        surname VARCHAR ( 50 ) NOT NULL,
        password VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP,
        PRIMARY KEY (id)
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
