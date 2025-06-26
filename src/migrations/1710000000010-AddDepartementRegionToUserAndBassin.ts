import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartementRegionToUserAndBassin1710000000010 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "departement" varchar(255);`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "region" varchar(255);`);
        await queryRunner.query(`ALTER TABLE "bassins" ADD COLUMN IF NOT EXISTS "departement" varchar(255);`);
        await queryRunner.query(`ALTER TABLE "bassins" ADD COLUMN IF NOT EXISTS "region" varchar(255);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "departement";`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "region";`);
        await queryRunner.query(`ALTER TABLE "bassins" DROP COLUMN IF EXISTS "departement";`);
        await queryRunner.query(`ALTER TABLE "bassins" DROP COLUMN IF EXISTS "region";`);
    }
} 