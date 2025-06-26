import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartementRegionAndRelations1710000000011 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "departements" (
            "id" SERIAL PRIMARY KEY,
            "nom" VARCHAR(255) UNIQUE NOT NULL
        );`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "regions" (
            "id" SERIAL PRIMARY KEY,
            "nom" VARCHAR(255) NOT NULL,
            "departementId" INTEGER REFERENCES "departements"("id") ON DELETE SET NULL
        );`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "regionId" INTEGER REFERENCES "regions"("id") ON DELETE SET NULL;`);
        await queryRunner.query(`ALTER TABLE "bassins" ADD COLUMN IF NOT EXISTS "regionId" INTEGER REFERENCES "regions"("id") ON DELETE SET NULL;`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "departement";`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "region";`);
        await queryRunner.query(`ALTER TABLE "bassins" DROP COLUMN IF EXISTS "departement";`);
        await queryRunner.query(`ALTER TABLE "bassins" DROP COLUMN IF EXISTS "region";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "departement" VARCHAR(255);`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "region" VARCHAR(255);`);
        await queryRunner.query(`ALTER TABLE "bassins" ADD COLUMN IF NOT EXISTS "departement" VARCHAR(255);`);
        await queryRunner.query(`ALTER TABLE "bassins" ADD COLUMN IF NOT EXISTS "region" VARCHAR(255);`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "regionId";`);
        await queryRunner.query(`ALTER TABLE "bassins" DROP COLUMN IF EXISTS "regionId";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "regions";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "departements";`);
    }
} 