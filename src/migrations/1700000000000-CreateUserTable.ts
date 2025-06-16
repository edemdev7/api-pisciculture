import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nom",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "prenom",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "150",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["ADMIN", "PISCICULTEUR"],
                        default: "'PISCICULTEUR'",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
} 